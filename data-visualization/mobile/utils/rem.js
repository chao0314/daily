window.addEventListener('load',()=>{

    console.log('load')
    const  clientW =  document.documentElement.clientWidth;
    console.log(clientW)
    document.documentElement.style.fontSize = 100*clientW/750+'px';

})