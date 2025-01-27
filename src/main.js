// This is the High level JS runtime for Rive
// https://rive.app/community/doc/web-js/docvlgbnS1mp


    // ---------------------------------
        // The layout of the graphic will adhere to
        const layout = new rive.Layout({
          fit: rive.Fit.Layout, // Setting to Fit.Layout will auto update the artboard size
          layoutScaleFactor: 1.0, // Scale of the layout when using `Fit.Layout`
      });

      // ---------------------------------
      // HTML Canvas element to render to
      const riveCanvas = document.getElementById("canvas");

      function computeSize() {
          riveInstance.resizeDrawingSurfaceToCanvas();
      
          
          
      }

      // Subscribe to window size changes and update call `resizeDrawingSurfaceToCanvas`
      window.onresize = computeSize;

      // Subscribe to devicePixelRatio changes and call `resizeDrawingSurfaceToCanvas`
      window
          .matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
          .addEventListener("change", computeSize);


      ////
      ////
      ////
      ////


const riveInstance = new rive.Rive({
  src: "rss.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  artboard: "Artboard",
  stateMachines: "State Machine 1",
  automaticallyHandleEvents: true, // Automatically handle RiveHTTPEvents,
  layout: layout, // Provides additional layout control.
            autoplay: true,

  onLoad: () => {
    riveInstance.resizeDrawingSurfaceToCanvas();
    
    const onRiveEventReceived = (riveEvent) => {
      const eventData = riveEvent.data;
      const eventProperties = eventData.properties;

      // Events from the Rive File
      if (eventData.type === rive.RiveEventType.General) {
        console.log(eventData.properties.Index);
        window.open(itemList[eventData.properties.Index].link,'_blank')
        console.log(itemList);
        
        if (eventData.name == "Event 1") {          
        }
      }
    };
  
      riveInstance.on(rive.EventType.RiveEvent, onRiveEventReceived);

    // Function to fetch RSS feed using Fetch API with a CORS Proxy
    async function fetchRSSWithProxy(proxyUrl, rssUrl) {
      try {
          const response = await fetch(`${proxyUrl}${encodeURIComponent(rssUrl)}`);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data.contents; // Access the RSS data
      } catch (error) {
          console.error('Error fetching RSS feed through proxy:', error);
      }
  }

  ///////////////
  // LOAD XML //
  //////////////

  async function loadXML() {
    try {
        const response = await fetch('rss.xml');
        const xmlString = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        const name = xmlDoc.querySelector('description').textContent;
        console.log(name);
        console.log(xmlDoc);
        /////////////
        // xmlDoc = parseRSS(rssText);
        const feedItems = extractFeedItems(xmlDoc);
        displayFeedItems(feedItems);
    } catch (error) {
        console.error('Error loading XML:', error);
    }
}

loadXML();


  // Function to parse RSS feed using DOMParser
  function parseRSS(rssText) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(rssText, 'application/xml');
      return xmlDoc;
  }

  // Function to extract items from the parsed XML
  function extractFeedItems(xmlDoc) {
      const items = xmlDoc.getElementsByTagName('item');
      const feedItems = [];

    //   for (let i = 0; i < items.length; i++) {
      for (let i = 0; i < 10; i++) {
           const title = items[i].getElementsByTagName('title')[0].textContent;
           riveInstance.setTextRunValue("titleRun" + i, title);
           const description = items[i].getElementsByTagName('description')[0].textContent;
           riveInstance.setTextRunValue("descriptionRun" + i, description);
          const link = items[i].getElementsByTagName('link')[0].textContent;
          const pubDate = items[i].getElementsByTagName('pubDate')[0]?.textContent;
          riveInstance.setTextRunValue("pubDateRun" + i, pubDate);
          feedItems.push({ title, link, pubDate });
          
      }

     
      return feedItems;
  }
   
  let itemList = []

  // Function to display feed items in HTML
  function displayFeedItems(feedItems) {
    //    console.log(feedItems);
    //    console.log(feedItems[0].title);
    //    console.log(feedItems[0].pubDate);
    //    console.log(feedItems[0].link);
       itemList = feedItems;
       
      

       
  }








  },
});
