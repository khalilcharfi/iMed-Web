'use strict';


(async function init () {

    const 
        router = require('express').Router()


        module.exports.newDateTime = (date = null) => {
            /**
             * @description If date doesn't have time use this
             * @return { date with time }
             * let serverDate = new Date(),
                serverHours = serverDate.getHours(),
                serverMinutes = serverDate.getMinutes(),
                serverSeconds = serverDate.getSeconds(),
                serverMilliseconds = serverDate.getMilliseconds();
    
                date = date ? new Date(date) : new Date();
                date.setHours(serverHours + 8);
                date.setMinutes(serverMinutes);
                date.setSeconds(serverSeconds);
                date.setMilliseconds(serverMilliseconds);
                
                return date;
             */
    
            if( date ){
                let d = new Date(date);
                return new Date(d.setHours(d.getHours() + 8));
            }else{
                let d = new Date;
                return new Date(d.setHours(d.getHours() + 8));
            }
        }
})();