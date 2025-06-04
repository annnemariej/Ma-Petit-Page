
//flippe kortene

    const kort = document.querySelectorAll('.memoryKort')

    let harFlippetKort = false
    let låsBrett = false
    let førsteKort, andreKort

    function flipKort() { 
      const flipSound = new Audio('flipcard-91468.mp3')

        if (låsBrett) return
        if (this === førsteKort) return;

        flipSound.play()

        this.classList.add('flip')
    

    if (!harFlippetKort){
        harFlippetKort = true
        førsteKort = this
        return;
    }
 
    andreKort = this;
    harFlippetKort = false
 
    checkForMatch()
  }
 
  let poeng = 0
   

  function checkForMatch() {
    if (førsteKort.dataset.framework === andreKort.dataset.framework) {
      poeng += 1
      disableKort()

      if(poeng == makspoeng){
        setTimeout(function(){
          alert('Du vant!')
          omstart()
        }, 800)
      }
      return;
    }
 
    unflipKort() 
  }
 
  function disableKort() {
    førsteKort.removeEventListener('click', flipKort);
    andreKort.removeEventListener('click', flipKort);
  }
 
  function unflipKort() {
    låsBrett = true

    setTimeout(function () {
      førsteKort.classList.remove('flip')
      andreKort.classList.remove('flip')

      låsBrett = false

    }, 900)
  }

    kort.forEach(kortet => kortet.addEventListener('click', flipKort))

    function shuffle() {
        kort.forEach(kortet => {
          let ramdomPos = Math.floor(Math.random() * 12)
          kortet.style.order = ramdomPos
        })
      }

      shuffle()

      //restart knapp
      function omstart(){
        location.reload()
      }




//julemodus
const julemodeElement = document.getElementById('juleMode')

if (julemodeElement) {
    julemodeElement.addEventListener('click', function () {
        document.body.classList.toggle('jule-modus')
    })
}
