if (document.querySelector('.expanding-bio-container')) {
    let expandingBios = document.querySelectorAll('.expanding-bio-block')
    expandingBios.forEach(function(each){
        let bioToggle = each.querySelector('.expanding-bio-toggle a')
        let bioContainer = each.querySelector('.expanding-bio-container')
        bioToggle.addEventListener('click',function(click){
            bioContainer.classList.toggle('toggled')
            bioToggle.classList.toggle('active')
            if (bioToggle.classList.contains('active')) {
                bioToggle.textContent = 'Read Less'
            } else {
                bioToggle.textContent = 'Read More'
            }
        })
    })
}