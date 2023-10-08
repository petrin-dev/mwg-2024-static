if (document.querySelector('#posts')) {

  const API_URL = `${window.location.protocol}//${window.location.hostname}/wp-json/wp/v2/posts`;
  
  let offset = 0;
  const perPage = 2;
  let maxPosts = 0;
  
  const clearPosts = () => {
    const postsContainer = document.getElementById('posts');
    while (postsContainer.firstChild) {
      postsContainer.removeChild(postsContainer.lastChild);
    }
  }
  
  const loadPosts = (cats) => {
    if (cats) {
      filterParam = `&categories=${cats}`
    } else {
      filterParam = ''
    }
    const url = `${API_URL}?_embed&per_page=${perPage}&offset=${offset}${filterParam}`;
    // console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(posts => {
        document.getElementById('load-more').style.display = 'block';
        document.querySelector('#no-more-posts').style.display = 'none'
        if (posts.length === 0) {
          document.getElementById('load-more').style.display = 'none';
          document.querySelector('#no-more-posts').style.display = 'block'
          return;
        }
  
        maxPosts = posts[0].total;
        offset += posts.length;
        appendPosts(posts);
  
        if (offset >= maxPosts) {
          document.getElementById('load-more').style.display = 'none';
          const message = document.createElement('p');
          message.textContent = 'All posts have been loaded.';
          document.getElementById('posts').appendChild(message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  const appendPosts = (posts) => {
    const postsContainer = document.getElementById('posts');
    posts.forEach(post => {
      const postElement = createPostElement(post);
      postsContainer.appendChild(postElement);
    });
  };
  
  const createPostElement = (post) => {
    // console.log(post)
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <article>
        <a href="${post.link}">
          <img src="${post['_embedded']['wp:featuredmedia'][0]['source_url']}">
          <h2 style="font-size: 20px;">
            <a href="${post.link}">${post.title.rendered}</a>
          </h2>
          <p>
            <a href="${post['_embedded'].author[0].link}">By ${post['_embedded'].author[0].name}</a>
          </p>
          <p>
            <a href="${post.link}">${post.excerpt.rendered}</a>
          </p>
        </a>
        <a href="${post.link}">Read More</a>
      </article>
    `;
    return postElement;
  };
  
  if (document.getElementById('load-more')) {
    const loadMoreButton = document.getElementById('load-more');
    loadMoreButton.addEventListener('click', () => {
      loadMoreButton.innerText = "Loading..."
      setTimeout(function(){
        loadMoreButton.innerText = "Load More"
      }, 1200)
      setTimeout(function(){
        loadPosts(cats);
      }, 1000)
    });
  } 
  
  loadPosts();
  
  let categoryFilters = document.querySelectorAll('.category-filter')
  let cats = ''
  categoryFilters.forEach(function(each,index){
    let resetFilters = document.querySelector('#reset-filters')
    each.addEventListener('click',function(event){
      if (index) {
        each.classList.toggle('toggled')
        resetFilters.classList.remove('active')
      } else {
        let toggled = document.querySelectorAll('.toggled')
        resetFilters.classList.add('active')
        toggled.forEach(function(each){
          each.classList.remove('toggled')
          cats = ''
        })
      }
      let toggled = document.querySelectorAll('.toggled')
      if (toggled.length === 0) {
        resetFilters.classList.add('active')
        cats = ''
      } else {
        resetFilters.classList.remove('active')
      }
      let toggledCats = []
      toggled.forEach(function(each){
        toggledCats.push(each.title)
        cats = toggledCats.join(',')
      })
      offset = 0
      clearPosts()
      loadPosts(cats)
    })
  })
}

