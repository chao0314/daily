
Try the demo
How to use?
npm install vue-count-to
Example
<template>
<countTo :startVal='startVal' :endVal='endVal' :duration='3000'></countTo>
</template>

<script>
  import countTo from 'vue-count-to';
  export default {
    components: { countTo },
    data () {
      return {
        startVal: 0,
        endVal: 2017
      }
    }
  }
</script>
demo:

demo

Use CDN Script: demo

Options

Property	Description	type	default
startVal	the value you want to begin at	Number	0
endVal	    the value you want to arrive at	Number	2017
duration	duration in millisecond	Number	3000
autoplay	when mounted autoplay	Boolean	true
decimals	the number of decimal places to show	Number	0
decimal	    the split decimal	String	.
separator	the separator	String	,
prefix	    the prefix	String	''
suffix	    the suffix	String	''
useEasing	is use easing function	Boolean	true
easingFn	the easing function	Function	—
** notes: when autoplay:true , it will auto start when startVal or endVal change **

Functions

Function Name	    Description
mountedCallback	    when mounted will emit mountedCallback
start	            start the countTo
pause	            pause the countTo
reset	            reset the countTo