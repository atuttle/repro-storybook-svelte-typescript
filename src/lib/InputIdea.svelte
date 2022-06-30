<script>
  export let validationFunction = (value) => {
    console.log(value)
    return false
  }

  let isValid = false

  const {'class': classes, ...props} = $$restProps

  function handleInput(e) {
    isValid = validationFunction(e.target.value)
  }
</script>

<div class="{classes}">
    <input
            class:invalid={!isValid}
            {...props}
            on:input={handleInput}
    />
</div>

<style>
    .invalid {
        border: solid 3px red
    }
</style>
