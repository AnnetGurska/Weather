module.exports = {
    getEnvironment: function () {
     //  console.log('env', process.env.NODE_ENV );
        return this.environments[process.env.NODE_ENV]
    },

    maps:{
        defaultCoordinates:{
            lat: 50.45466,
            lng:  30.5238
        },
     },
    environments:{
        development: {
            serverBaseURL:'http://localhost:3038'
        },
        local:{
            serverBaseURL:'http://localhost:3038'
        },
    },
    templateEngine: 'handlebars',

};
