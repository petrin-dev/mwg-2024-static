if (document.querySelector('.detail-category-block')) {
    let detailToggles = document.querySelectorAll('.detail-toggle')
    detailToggles.forEach(function(each){
        each.addEventListener('click',function(click){
            let closestItem = each.closest('.detail-item')
            if (each.classList.contains('toggled')) {
                each.classList.remove('toggled')
                closestItem.classList.remove('active')
            } else {
                each.classList.add('toggled')
                closestItem.classList.add('active')
            }
        })
    })

    let detailFilters = document.querySelectorAll('.detail-category-container p')
    detailFilters.forEach(function(each, index){
        each.addEventListener('click',function(click){
            let activeFilter = document.querySelector('.detail-category-container p.detail-category-active')
            activeFilter.classList.remove('detail-category-active')
            click.target.classList.add('detail-category-active')
            if (click.target.id) {
                let groupsToShow = document.querySelectorAll('.detail-category-block')
                groupsToShow.forEach(function(group){
                    group.classList.add('visible')
                })
            } else {
                let groupsToHide = document.querySelectorAll('.detail-category-block')
                groupsToHide.forEach(function(group){
                    group.classList.remove('visible')
                })              
                let groupToShow = index - 1
                groupsToHide[groupToShow].classList.add('visible')
            }
        })
    })
}