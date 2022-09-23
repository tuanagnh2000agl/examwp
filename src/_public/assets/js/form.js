
// handle from
// call function
/* eslint-disable */

function validator(options){
    // save rules
    var selectorRules = {} 
    function validate(inputElement, rule){
        // value : inputElement.value
        // test : rule.test
        var errorElement = inputElement.parentElement.parentElement.querySelector(options.errorSelector);
        var errorMessage;
        // get the rule of selector
        var rules = selectorRules[rule.selector];
        // Iterate through the rules and check if there is an error then stop the checking
        for(var i =0; i< rules.length; ++i){
            errorMessage = rules[i](inputElement.value);
            if(errorMessage){
                break;
            } 
        }
        if(errorMessage){
            errorElement.innerText = errorMessage;
            // handle print out error message and add css
            errorElement.classList.add('is-marginl');
            inputElement.parentElement.parentElement.classList.add('invalid')
        }else{
            errorElement.innerText = "";
            inputElement.parentElement.parentElement.classList.remove('invalid')
        }
        return !errorMessage; 
    }
    // get the element for the form to validate
    var formElement = document.querySelector(options.form);
    if(formElement){
        // when click submit form
        formElement.onsubmit = function(e){
            e.preventDefault();
            var isFormVlaid = true;
            //done when the user clicks submit, the validate message is displayed
            options.rules.forEach((rule)=>{
                var inputElement = formElement.querySelector(rule.selector);
                   var isVlaid =  validate(inputElement, rule);
                   if(!isVlaid){
                         isFormVlaid = false;
                         const messagePlease = document.querySelector('.u-message__please');
                         messagePlease.innerText = "入力内容を確認してください。";
                        //  const messageadd = document.querySelectorAll('.u-message');
                   }
            });
            
            if(isFormVlaid){
                if(typeof options.onsubmit === 'function'){
                    //get all property is name Do not get disabled properties
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    // convert nodelist into array
                    var formValure = Array.from(enableInputs).reduce((values, input)=>{
                        return (values[input.name] = input.value) && values;
                    }, {})  
                    // return the data entered from the form
                    options.onsubmit(formValure);
                }else{
                    // submit with default behavior
                    formElement.submit();
                }
            }
        }

        options.rules.forEach((rule)=>{
            // Save the rules for each input
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }else{
                selectorRules[rule.selector] = [rule.test]
            }
            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement){
                //Handling the case when the onblur goes out
                inputElement.onblur = ()=>{
                    validate(inputElement, rule);
                }
                // handle when the user enters the input, hide the error message
                inputElement.oninput = ()=>{
                    var errorElement = inputElement.parentElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = "";
                    inputElement.parentElement.parentElement.classList.remove('invalid');
                }
            }
        })
    }  
}
// 1 there is an error return an error message
// When valid, no error message is displayed
validator.isRequired = function (selector, message){
    return {
        selector: selector,
        test: function (value){
            return value.trim() ? undefined: message || "今日参加してください";
        }
    };
}


validator.isEmail = function (selector, message){
    return {
        selector: selector,
        test: function (value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || "正しいメール形式を入力してください";
        }
    };
}

validator.isPhone = function (selector, message){
    return {
        selector: selector,
        test: function (value){
            var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            return regex.test(value) ? undefined : message || "正しい電話番号の形式を入力してください";
        }
    };
}

validator.content = function (selector, min, message){
    return {
        selector: selector,
        test: function (value){
            return value.length > min ? undefined : message || `${min} 文字以上の内容を入力してください`;
        }
    };
}


validator({
    form: '#is-form',
    errorSelector: '.u-message',
    rules:[
        validator.isRequired('#fullname', '『氏名』を入力してください。'),
        validator.isRequired('#phone', '『電話番号』を入力してください。'),
        validator.isPhone('#phone', '電話番号は上記10桁の数字と以下のフォーマットで入力してください (123) 456-7890, (123)456-7890, 123.456.7890, 123-456-7890, +31636363634, 1234567890, 075-63546725'),
        validator.isRequired('#email', '『メールアドレス』を入力してください。'),
        validator.isEmail('#email', '無効な電子メール 電子メールには @ 文字と最後のドメインが必要です (例: tuananh47082@gmail.com)。'),
        validator.isRequired('#content', '『お問い合わせ内容』を入力してください。'),
        validator.content('#content', 2, `${2}文字以上入力してください`),
    ], 
    onsubmit: function(data){
      console.log(data);
    }
})