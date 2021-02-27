const request = require('superagent');

 module.exports = (app) => {
    app.post('/api/stock/portfolio', function (req, res, next) {
    const apiKey='3KYYJ04S8PXDYJ9O.1..5'
    const symbols = ['IBM'];
    let completed =0;
    const results =[];
    console.log('ok');
    for (let i=0 ; i<symbols.length ;i += 1){  
          const symbol=symbols[i] ;
          console.log('symbol',symbol);   
        request
        .get('https://www.alphavantage.co/query')
        .query({ 'function': 'TIME_SERIES_INTRADAY' })
        .query({ symbol: symbol })
        .query({'interval':'5min'})
        .query({ apikey: apiKey })     
        .then(response => {
            completed += 1;
            //console.log('res',res.body);
            results.push(response.body);
            if(completed === symbols.length){
                    console.log('completed');
                    console.log('RESULT',results)
                    res.send({
                        success: true,
                        message:'symbol info',
                        results: results
                    })
            }
            
        });
    }
    });
}; 