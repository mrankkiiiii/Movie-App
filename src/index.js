import React,{createContext} from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import './index.css';
import App from './components/App';
import rootReducer from './reducers';
import thunk from 'redux-thunk';


const logger = ({dispatch, getState}) => (next) => (action) =>{
  console.log('Action',action);
  next(action);
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
export const StoreContext = createContext();

class Provider extends React.Component{
  render(){
    const {store} = this.props;
    return (
      <StoreContext.Provider value={store}>
      {
        this.props.children
      }
      </StoreContext.Provider>
    )
  }
}


export function connect(callback) {
  return function (Component) {
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this.unsubscribe = this.props.store.subscribe(() => {
          this.forceUpdate();
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        const { store } = this.props;
        const state = store.getState();
        const dataToBeSentAsProps = callback(state);

        return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
      }
    }

    class ConnectedComponentWrapper extends React.Component{
      render(){
        return(
          <StoreContext.Consumer>
            {
              (store) => {
                return <ConnectedComponent store={store} />
              }
            }
          </StoreContext.Consumer>
        );
      }
    }
    return ConnectedComponentWrapper;
  };
}
  

// console.log(store);

// console.log("Initial State",store.getState());

// store.dispatch({
//   type: "ADD_MOVIES",
//   movies: [{
//     name: 'Superman'
//   }]
// })

// console.log("Final State",store.getState());

ReactDOM.render(
  <Provider store ={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);