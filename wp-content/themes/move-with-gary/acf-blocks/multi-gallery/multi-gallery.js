if (document.querySelector('.multi-gallery-wrap')) {

    createImageModal()

    let galleryToggles = document.querySelectorAll('.multi-gallery-toggle')
    galleryToggles[0].classList.add('toggled')

    let galleries = document.querySelectorAll('.single-gallery-wrap')
    galleries[0].classList.add('active')

    galleryToggles.forEach(function(each,index){
        each.addEventListener('click',function(click){
            galleries.forEach(function(gallery){
                gallery.classList.remove('active')
            })
            galleries[index].classList.add('active')
            galleryToggles.forEach(function(toggle){
                toggle.classList.remove('toggled')
            })
            each.classList.add('toggled')
            populateItems()
        })
    })

    galleries.forEach(function(each){
        let galleryThumbs = each.querySelectorAll('a')
        galleryThumbs.forEach(function(thumb, index){
            let itemImage = thumb.querySelector('img')
    
            thumb.addEventListener('click',function(click){
                click.preventDefault()
                populateImageModal(index)
            })
        })
    })

    let galleryItems = []
    populateItems()

    function populateItems() {
        galleryItems = []
        let activeGallery = document.querySelector('.single-gallery-wrap.active')
        let activeGalleryItems = activeGallery.querySelectorAll('a')
        // console.log(activeGalleryItems.length)

        activeGalleryItems.forEach(function(each, index){
            let image = each.querySelector('img')

            let imageData = {
                largeURL: each.download,
                altText: image.alt,
                index: index,
                totalItems: activeGalleryItems.length
            }
            galleryItems.push(imageData)

        })
        // console.log(galleryItems)
    }

    function populateImageModal(item) {
        let activeItem = galleryItems[item]

        let pagination = `${activeItem.index + 1}/${galleryItems.length}`

        let imageModal = document.querySelector('footer.wp-block-template-part dialog.image-modal')
        while (imageModal.childNodes.length > 0) {
            imageModal.removeChild(imageModal.firstChild)
        }
        let imageFrame = document.createElement('div')
        imageFrame.setAttribute('id','image-frame')
        imageModal.appendChild(imageFrame)
        
        let imageImage = document.createElement('img')
        imageImage.setAttribute('src',activeItem.largeURL)
        imageFrame.appendChild(imageImage)
        
        let imagePrev = document.createElement('div')
        imagePrev.classList.add('image-nav')
        imagePrev.classList.add('image-prev')
        imagePrev.textContent = '‹'
        imagePrev.id = ''
        if (activeItem.index === 0) {
            imagePrev.id = galleryItems.length - 1
        } else {
            imagePrev.id = activeItem.index - 1
        }
        imageFrame.appendChild(imagePrev)
        
        let imageNext = document.createElement('div')
        imageNext.classList.add('image-nav')
        imageNext.classList.add('image-next')
        imageNext.textContent = '›'
        imageNext.id = ''
        if (activeItem.index + 1 === galleryItems.length) {
            imageNext.id = 0
        } else {
            imageNext.id = activeItem.index + 1
        }
        imageFrame.appendChild(imageNext)

        let imageAlt = document.createElement('span')
        imageAlt.classList.add('image-alt')
        imageAlt.textContent = activeItem.altText
        imageFrame.appendChild(imageAlt)

        let imagePage = document.createElement('span')
        imagePage.classList.add('image-page')
        imagePage.textContent = pagination
        imageFrame.appendChild(imagePage)

        if (!imageModal.hasAttribute('open')) {
            imageModal.showModal()
        }
        
        document.body.classList.add('no-scroll')
    }

    function createImageModal() {
        let footer = document.querySelector('footer.wp-block-template-part')
        let imageModal = document.createElement('dialog')
        imageModal.classList.add('image-modal')
        imageModal.addEventListener('click', function(click) {
            if (click.target.classList.contains('image-modal')) {
                imageModal.close()
                while (imageModal.childNodes.length > 0) {
                    imageModal.removeChild(imageModal.firstChild)
                }
                document.body.classList.remove('no-scroll')
            } else if (click.target.id === 'image-frame') {
                imageModal.close()
                document.body.classList.remove('no-scroll')
            } else if (click.target.classList.contains('image-nav')) {
                click.preventDefault()
                populateImageModal(click.target.id)
                // console.log(click.target.id)
            } else {
                click.preventDefault()
            }
        })
        document.addEventListener("keydown", function(event) {
            if (event.key === "ArrowLeft") {
                if (imageModal.hasAttribute('open')) {
                    let imagePrev = document.querySelector('.image-prev')
                    populateImageModal(imagePrev.id)
                } else {
                    return
                }
            } else if (event.key === "ArrowRight") {
                if (imageModal.hasAttribute('open')) {
                    let imageNext = document.querySelector('.image-next')
                    populateImageModal(imageNext.id)
                } else {
                    return
                }
            }
          });
        footer.appendChild(imageModal)
    }
}