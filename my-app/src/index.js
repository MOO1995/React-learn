import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     constructor(props){
//         super(props);   //继承  props
//         this.state={
//             value:null,
//         };
//     }
//     render() {
//       return (
//         <button className="square" 
//         // onClick={()=>alert('click')}>
//         onClick={()=>this.setState({'value':'X'})}>
//           {/* {this.props.value} */}
//           {this.state.value}
//         </button>
//       );
//     }
//   }
// class Square extends React.Component{
//     render(){
//         //应该将onClick事件交给父组件 handleClick函数 处理
//         return(
//             <button 
//                 className="square"
//                 onClick={()=>this.props.onClick()}>  
//                 {this.props.value}
//             </button>
//         )
//     }
// }
  //Square 写成一个函数组件
  function Square(props){
      return(
          <button className="square" onClick={props.onClick}>
              {props.value}
          </button>
      )
  }

  function calculateWinner(squares){
      //胜负线
      const lines=[
          [0,1,2],
          [3,4,5],
          [6,7,8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
      ];
      for(let i=0;i<lines.length;i++){
          const [a,b,c]=lines[i];
          if (squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
              return squares[a];
          }
      }
      return null;
  }
  class Board extends React.Component {

    // //把数据存储在父组件中，方便复用
    // constructor(props){
    //     super(props);
    //     this.state={
    //         squares:Array(9).fill(null),
    //         xIsNext:true,
    //     }
    // }
    // handleClick(i){
    //     const squares=this.state.squares.slice(); //深度复制？？
    //     // alert(this.state.noonewin)
        
    //     if (!squares[i]){
          
    //       squares[i]=this.state.xIsNext ? 'X':'O';
    //       this.setState({xIsNext:this.state.xIsNext ? false:true});
    //       this.setState({squares:squares});

          
    //     }
        
    // }
    renderSquare(i) {
      return <Square value={this.props.squares[i]}
          // onClick={()=>this.handleClick(i,winner)
          onClick={()=>this.props.onClick(i)}
      />;    //父组件是Board,子组件是Square  ， value={} 传值？
    }
    
  
    render() {
      // const status = 'Next player: X';
      // const winner=calculateWinner(this.state.squares);
      // var status;
      // if(winner){
      //     status="Winner: "+winner;
      //     // this.setState({noonewin:this.state.noonewin ? false:true});

      // }else{
      //     status="Next player: "+(this.state.xIsNext ? "X":"O");
      // }

  
      return (
        <div>
          {/* <div className="status">{status}</div> */}
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state={
        history:[
          {
            squares:Array(9).fill(null)
          }
        ],
        xIsNext:true,
        stepNumber:0,

      }
    }
    handleClick(i) {
      const history = this.state.history.slice(0,this.state.stepNumber+1);   //不直接使用原函数是有极大好处的
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) { 
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber:this.state.stepNumber + 1
      });
    }
    jumpTo(step){
      this.setState({
        stepNumber:step,
        xIsNext:(step%2)===0,
      })
    }
    render() {
      const history = this.state.history;   //每次更新都可以声明
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      //-----------------------------------
      //这么map真复杂，，{squares:Array(9)}
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      //------------------------------------
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        
        <div className="game">
          <div className="game-board">
          {/* 直接将类引入 */}
            <Board 
              squares={current.squares}
              onClick={(i)=>this.handleClick(i)}
            />   
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  // function formation(user){
  //   return user.firstName+user.lastName
  // };
  // const name={
  //   firstName:"mo",
  //   lastName:"wei"};
  // const element=<div>
  //   <h1>Hello!</h1>
  //   <h2>Good to see you here.</h2>
  // </div>

  // const title=Response.potentiallyMaliciousInput;
  // const element=<h1>{title}</h1>;
  // const element=React.createElement(
  //       'h1',
  //       {className:'greeting'},
  //       'hello World'
  // );
  //------------------------
  //这个只是逻辑结构
  // const element = {
  //   type:'h1',
  //   props:{
  //     className:'greeting',
  //     children:'Hello World!'
  //   }
  // };
  //------------------------

  //函数不能直接渲染
  function Welcome(props){
    return <h1>hello , {props.name}</h1>;
  }
  const element=<Welcome name="mo wei">
    {/* 所以这个是没意义的 */}
    <h1>哈哈哈</h1>
  </Welcome>
  // class Welcome extends React.Component{
  //   render(){
  //     return <h1>hello world!</h1>;
  //   }
  // }
  // function App(){
  //   return(
  //     <div>
  //       <Welcome name="hdasdaksjdk"></Welcome>
  //       <Welcome name="buibuibuibui"></Welcome>
  //       <Welcome name="dingdingdingding"></Welcome>

  //     </div>
  //   )
  // }

  function Avatar(props) {
    return (
      <img className="Avatar"
        src={props.user.avatarUrl}
        alt={props.user.name}></img>
    )
  }
  function UserInfo(props){
    return (
      <div className="UserInfo">
          <Avatar user={props.user}></Avatar>
          <div className="UserInfo-name">
            {props.user.name}
          </div>
        </div>
    )
  }

  //函数内，是否不能实现构造体
  function Comment(props){

    const author={
      'avatarUrl':'qwiiouroweqkhasjf',
      'name':'mowei',
      'text':'哈哈哈哈'
    }//ok
    return(
      <div className="Comment">
        <UserInfo user={author}></UserInfo>
        <div className="Comment-text">
          {author.text}
        </div>
        <div className="Comment-date">
          {/* {formatDate(props.date)} */}
        </div>
      </div>
    )
  }
  

  // ReactDOM.render(
  //   // <Game />,
  //   // <Welcome/>,  //元素可以直接引用，函数和类要 <name/>
  //   // element,
  //   <Comment/>,
  //   document.getElementById('root')
  // );
  
  //逐步更新   像时间控件
  function tick(){
    const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
  }

  setInterval(tick,1000);
  