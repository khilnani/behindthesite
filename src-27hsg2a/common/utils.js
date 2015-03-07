
function trackEvent (product, technology) {
    Logger.event('trackEvent: ' + product + ', ' + technology);
    var title_pre = "BehindTheSite | "
    
    try {
      if( product != '' && technology == '') {
        // only product  
        document.title = title_pre + product;
        ga('send', 'event', 'Product', product);
      } else if( product == '' && technology != '') {
        // only tech
        document.title = title_pre + technology;
        ga('send', 'event', 'Technology', technology);
      } else if( product != '' && technology != '') {
        // both
        document.title = title_pre + product + " | " + technology;
        ga('send', 'event', 'Product', product);
        ga('send', 'event', 'Technology', technology);
      } else if( product == '' && technology == '') {
        // none
        document.title = title_pre + "A log of technology stacks";
      }
    } catch(e) {
      Logger.warn('trackEvent: No GA setup');
      document.title = title_pre + "A log of technology stacks";
    }
}

function zq(data) {
    return w.__(w.__(y.__(data), 5), 9);
}
