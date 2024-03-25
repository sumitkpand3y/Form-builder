<template>
    <div>
    	<el-input 
    		:placeholder="currentField.isPlaceholderVisible ? currentField.placeholder : ''"  v-model="textInput">	
    	</el-input>
    </div>
</template>

<script>
  export default {
    name: 'TextInput',
  props: ['currentField'],
     data() {
    	return {
    		textInput: ''
    	}
    }
  }
</script>