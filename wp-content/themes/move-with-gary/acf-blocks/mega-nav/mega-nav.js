let meganavParents = document.querySelectorAll('.meganav-parent')
        // meganavParents[2].querySelector('.meganav-subnav').classList.add('open')

        meganavParents.forEach(function(each){
            if (each.querySelector('.meganav-subnav')) {
                let showHover = each.querySelector('.meganav-subnav')
                each.addEventListener('mouseover',function(event){
                    if (window.innerWidth > 991) {
                        showHover.classList.add('open')
                        each.classList.add('show-arrow')
                        document.body.classList.add('no-scroll')
                    }
                })
                each.addEventListener('mouseout',function(event){
                    if (window.innerWidth > 991) {
                        showHover.classList.remove('open')
                        each.classList.remove('show-arrow')
                        document.body.classList.remove('no-scroll')
                    }
                })
            }
        })

        let meganavGrandchildren = document.querySelectorAll('.meganav-grandchildren')
        meganavGrandchildren.forEach(function(each){
            let previous = each.previousSibling
            previous.addEventListener('mouseover',function(event){
                if (window.innerWidth > 991) {
                    each.classList.add('open')
                }
            })
            each.addEventListener('mouseover',function(event){
                if (window.innerWidth > 991) {
                    each.classList.add('open')
                }
            })
            previous.addEventListener('mouseout',function(event){
                if (window.innerWidth > 991) {
                    each.classList.remove('open')
                }
            })
            each.addEventListener('mouseout',function(event){
                if (window.innerWidth > 991) {
                    each.classList.remove('open')
                }
            })
        })