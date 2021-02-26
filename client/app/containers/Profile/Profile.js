import React, { Component } from 'react';
import StockInfo from '../../components/profile/StockInfo';
class Profile extends Component {
    constructor(props){
        super(props);

        this.state={
            isLoading: true,
            error: null,
            results:[],
        };

        this.fetchProfileStockInfo = this.fetchProfileStockInfo.bind(this);
    }

    componentWillMount() {
        this.fetchProfileStockInfo();
    }

    fetchProfileStockInfo(){
        console.log('fetchProfileStockInfo');
        
    fetch('/api/stock/portfolio', { method: 'POST' })
          .then(res => res.json())
      .     then(json => {
                if (json.success){
                    this.setState({
                        isLoading: false,
                        results: json.results,
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        error: json.message,
                    });
                }
            
        });
      };

    

    render() {
        const{
            error,
            isLoading,
            results,
        } = this.state;
        //const isLoading = this.state.isLoading;
        if(isLoading){
            return(
                <div>
                    <p>Loading...</p>
                </div>);
        }
        if(error){
            return(
                <div style={{ backgroundColor: '#FF0000' }}>
                    <p style={{ color: '#fff' }}>
                        {error}
                    </p>
                </div>)
        }
        return (
            <div>
                <p>Profile</p>
                <meta httpEquiv="refresh" content="300" ></meta>
                {
                    results.map(result =><StockInfo data={result}/>)
                }
            </div>
            );
    }

}
export default Profile ;

