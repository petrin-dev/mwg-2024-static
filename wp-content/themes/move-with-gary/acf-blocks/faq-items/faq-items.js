if (document.querySelector('.faq-category-container')) {
    let faqToggles = document.querySelectorAll('.faq-toggle')
    faqToggles.forEach(function(each){
        each.addEventListener('click',function(click){
            let closestItem = each.closest('.faq-item')
            if (each.classList.contains('toggled')) {
                each.classList.remove('toggled')
                closestItem.classList.remove('active')
            } else {
                each.classList.add('toggled')
                closestItem.classList.add('active')
            }
        })
    })

    let faqFilters = document.querySelectorAll('.faq-category-container p')
    faqFilters.forEach(function(each, index){
        each.addEventListener('click',function(click){
            let activeFilter = document.querySelector('.faq-category-container p.faq-category-active')
            activeFilter.classList.remove('faq-category-active')
            click.target.classList.add('faq-category-active')
            if (click.target.id) {
                let groupsToShow = document.querySelectorAll('.faq-category-block')
                groupsToShow.forEach(function(group){
                    group.classList.add('visible')
                })
            } else {
                let groupsToHide = document.querySelectorAll('.faq-category-block')
                groupsToHide.forEach(function(group){
                    group.classList.remove('visible')
                })              
                let groupToShow = index - 1
                groupsToHide[groupToShow].classList.add('visible')
            }
        })
    })
}