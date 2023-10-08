(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var a11y = require('./src/a11y.js')
var animation = require('./src/animation.js')
var navigation = require('./src/navigation.js')
var mentSubnav = require('./src/mh-subnav.js')
var footer = require('./src/footer.js')
var videos = require('./src/videos.js')
var loadMore = require('./src/load-more.js')
},{"./src/a11y.js":2,"./src/animation.js":3,"./src/footer.js":4,"./src/load-more.js":5,"./src/mh-subnav.js":6,"./src/navigation.js":7,"./src/videos.js":8}],2:[function(require,module,exports){
/* ACCESSIBILITY */

// Adding aria-label to logos linking to Homepage
let headerLogos = document.querySelectorAll('header a[href="/"]')
if (headerLogos) {
    headerLogos.forEach(function(each){
        each.ariaLabel = "Return to Homepage"
    })
}
let footerLogo = document.querySelector('footer a[href="/"]')
if (footerLogo) {
    footerLogo.ariaLabel = "Return to Homepage"
}

// Adding aria-label to images for Work Pages
let workClients = document.querySelectorAll('.work-client-item')
if (workClients) {
    workClients.forEach(function(each){
        let labelingText = each.querySelector('.label-link')
        let toBeLabeled = each.querySelector('.work-image a')
        toBeLabeled.ariaLabel = `Click to go to the ${labelingText.textContent} client page`
    })
}
},{}],3:[function(require,module,exports){
// Animation Handler -- checks if BODY children have been scrolled into view
function revealElements() {
    // Get all elements with the "has-animation" class
    const animatedElements = document.querySelectorAll(".has-animation");
  
    // Loop through each animated element
    for (let i = 0; i < animatedElements.length; i++) {
      const element = animatedElements[i];
  
      // Check if the element is partially in view
      const isPartiallyInView = isElementPartiallyInView(element);
      if (isPartiallyInView) {
        // If the element is partially in view, append the "has-been-revealed" class to it
        element.classList.add("has-been-revealed");
      }
    }
  }
  
  function isElementPartiallyInView(element) {
    // Get the element's bounding rect
    const boundingRect = element.getBoundingClientRect();
  
    // Check if the element is partially within the viewport
    return (
      boundingRect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      boundingRect.bottom >= 0
    );
  }
  
// Run these checks on scroll and on page load
window.addEventListener("scroll", revealElements);
revealElements();

// Wrap buttons in <span> to support animated state
const buttons = document.querySelectorAll('.wp-block-button a');
buttons.forEach(button => {
  const span = document.createElement('span');
  span.textContent = button.textContent;
  button.textContent = '';
  button.appendChild(span);
});
},{}],4:[function(require,module,exports){
if (document.querySelector('.footer-network-toggle')) {
    let networkToggle = document.querySelector('.footer-network-toggle')
    let networkLinks = document.querySelector('.footer-network-links')
    networkToggle.addEventListener('click',function(click){
        networkToggle.classList.toggle('toggled')
        networkLinks.classList.toggle('open')
    })
}
},{}],5:[function(require,module,exports){
document.querySelectorAll('.view-more-query').forEach(function (element) {
  element.addEventListener('click', function (e) {
      e.preventDefault();

      const self = this;
      const queryEl = this.closest('.wp-block-query');
      const postTemplateEl = queryEl.querySelector('.wp-block-post-template');

      if (queryEl && postTemplateEl) {
          const blockAttr = queryEl.getAttribute('data-attrs');

          if (blockAttr) {
              const block = JSON.parse(blockAttr);
              const maxPages = (block && block.attrs && block.attrs.query && block.attrs.query.pages) || 0;

              const ajaxUrl = '/wp-admin/admin-ajax.php'; // WordPress AJAX URL

              const xhr = new XMLHttpRequest();
              xhr.open('GET', ajaxUrl + '?action=query_render_more_pagination&attrs=' + encodeURIComponent(blockAttr) + '&paged=' + encodeURIComponent(queryEl.getAttribute('data-paged')), true);
              xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

              xhr.onload = function () {
                  const nextPage = Number(queryEl.getAttribute('data-paged')) + 1;

                  if (maxPages > 0 && nextPage >= maxPages) {
                      // Hide the "View More" button
                      self.closest('.view-more-container').style.display = 'none';

                      // Display the "No More" message here if needed
                      const noMoreMessage = document.querySelector('.no-more-posts');
                      if (noMoreMessage) {
                          noMoreMessage.style.display = 'block';
                      }
                  }

                  queryEl.setAttribute('data-paged', nextPage);

                  if (xhr.status === 200 && xhr.getResponseHeader('content-type').includes('application/json')) {
                      try {
                          const responseJSON = JSON.parse(xhr.responseText);
                          console.log(responseJSON);
                      } catch (error) {
                          console.error('Error parsing JSON response:', error);
                      }
                  } else {
                      handleHTMLResponse(xhr.responseText);
                  }
              };

              xhr.send();
          }
      }
  });
});

},{}],6:[function(require,module,exports){
if (document.querySelector('.mental-health-subpage-menu')) {
    let mhToggle = document.querySelector('.mh-nav-toggle')
    let mhSubnav = document.querySelector('.mental-health-subpage-menu')
    mhToggle.addEventListener('click',function(click){
        mhToggle.classList.toggle('toggled')
        mhSubnav.classList.toggle('open')
    })
}
},{}],7:[function(require,module,exports){
// window.addEventListener("load", (event) => {
//     let topLevelPages = document.querySelectorAll('.meganav-parent > a')
//     topLevelPages.forEach(function(each){
//         let currentPage = window.location.href
//         if (currentPage.includes(each.href)) {
//             each.classList.add('active-page')
//         }
//     })
//   })

// window.onscroll = function() { stickyScroll() }

// function stickyScroll() {
//     let headerWrap = document.querySelector('.header-wrap')
//     let topRowMenu = document.querySelector('.top-row-menu')
//     let meganav = document.querySelector('.meganav')
//     let scrollingDesktopToggle = document.querySelector('.scrolling-desktop-toggle')
//     if (window.pageYOffset) {
//         // console.log('im not on top')
//         headerWrap.classList.add('scrolling')
//         if (scrollingDesktopToggle) {
//             scrollingDesktopToggle.classList.remove('hidden')
//         }
//     } else {
//         // console.log('im on top')
//         headerWrap.classList.remove('scrolling')
//         headerWrap.classList.remove('menu-toggled')
//         if (topRowMenu) {
//             topRowMenu.style.maxHeight = ''
//         }
//         meganav.style.display = ''
//     }
// }

// if (document.querySelector('.scrolling-menu-toggle')) {
//     let scrollingMenuToggle = document.querySelector('.scrolling-menu-toggle')
//     scrollingMenuToggle.addEventListener('click',function(event){
//         let headerWrap = document.querySelector('.header-wrap')
//         headerWrap.classList.add('menu-toggled')
//         let topRowMenu = document.querySelector('.top-row-menu')
//         topRowMenu.style.maxHeight = '300px'
//         let meganav = document.querySelector('.meganav')
//         meganav.style.display = 'flex'
//         let scrollingDesktopToggle = document.querySelector('.scrolling-desktop-toggle')
//         scrollingDesktopToggle.classList.add('hidden')
//     })
// }

// if (document.querySelector('.mobile-menu-toggle')) {
//     let mobileMenuToggle = document.querySelector('.mobile-menu-toggle')
//     mobileMenuToggle.addEventListener('click',function(event){
//         let headerWrap = document.querySelector('.header-wrap')
//         let toggle = mobileMenuToggle.querySelector('.toggler')
//         if (headerWrap.classList.contains('menu-toggled')) {
//             headerWrap.classList.remove('menu-toggled')
//             document.body.classList.remove('no-scroll')
//             toggle.checked = false
//         } else {
//             headerWrap.classList.add('menu-toggled')
//             document.body.classList.add('no-scroll')
//             toggle.checked = true
//         }
//     })
// }

// if (document.querySelectorAll('.meganav-subnav-toggle')) {
//     let mobileSubnavToggles = document.querySelectorAll('.meganav-subnav-toggle')
//     mobileSubnavToggles.forEach(function(each){
//         each.addEventListener('click',function(event){
//             each.classList.toggle('toggled')
//             let closestMenu = each.parentNode.querySelector('.meganav-subnav')
//             closestMenu.classList.toggle('open')
//         })
//     })
// }

let socialLinks = document.querySelectorAll('.main-nav .wp-block-social-link-anchor')
socialLinks.forEach(function(each){
    each.target = '_blank'
})
},{}],8:[function(require,module,exports){
if (document.querySelector('.is-style-play-button-hl')) {
    createModal()
    let playButton = document.querySelectorAll('.is-style-play-button-hl a')
    playButton.forEach(function(each){
        let videoLink = each.href
        each.removeAttribute('href')
        each.addEventListener('click',function(click){
            populateModal(videoLink)
        })
    })
}

if (document.querySelector('.is-style-play-button-hd')) {
    createModal()
    let playButton = document.querySelectorAll('.is-style-play-button-hd a')
    playButton.forEach(function(each){
        let videoLink = each.href
        each.removeAttribute('href')
        each.addEventListener('click',function(click){
            populateModal(videoLink)
        })
    })
}

if (document.querySelector('.is-style-play-button-image')) {
    createModal()
    let playImages = document.querySelectorAll('.is-style-play-button-image a')
    playImages.forEach(function(each){
        let videoLink = each.href
        each.removeAttribute('href')
        each.addEventListener('click',function(click){
            populateModal(videoLink)
        })
    })
}

function createModal() {
    let footer = document.querySelector('footer.wp-block-template-part')
    let videoModal = document.createElement('dialog')
    videoModal.classList.add('video-modal')
    videoModal.addEventListener('click',function(click){
        videoModal.close()
        while (videoModal.childNodes.length > 0) {
            videoModal.removeChild(videoModal.firstChild)
        }
        document.body.classList.remove('no-scroll')
    })
    footer.appendChild(videoModal)
}

function populateModal(video) {
    video = video.replace('watch?v=','embed/')
    let videoModal = document.querySelector('footer.wp-block-template-part dialog.video-modal')
    while (videoModal.childNodes.length > 0) {
        videoModal.removeChild(videoModal.firstChild)
    }
    let videoFrame = document.createElement('iframe')
    videoFrame.setAttribute('id','video-frame')
    videoFrame.setAttribute('frameborder',0)
    videoFrame.setAttribute('scrolling','no')
    videoFrame.setAttribute('type','text/html')
    videoFrame.setAttribute('src',video)
    videoFrame.setAttribute('allowfullscreen', true)
    videoModal.appendChild(videoFrame)
    videoModal.showModal()
    document.body.classList.add('no-scroll')
}
},{}]},{},[1]);
