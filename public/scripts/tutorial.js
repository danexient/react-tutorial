var CommentBox = React.createClass({
  render: function () {
    return (
      <div className="CommentBox">
        <h1>Comments</h1>
        Hello, world! I am a CommentBox.
        <CommentList />
        <CommentForm />
        <div><Button1 /></div>
        <Testing />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
      <div className="CommentList">
        <Comment author="jim">This is a comment that I made</Comment>
        <Comment author="bob">This is another comment that I made</Comment>
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="CommentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var Button1 = React.createClass({
  render: function() {
    const a = [0,1]
    const b = [0,2]
    const c = a.concat(b)

    const apples = [
    { type: 'Red Delicious' },
    { type: 'Golden Delicious' },
    { type: 'Golden Delicious' },
    { type: 'Red Delicious' }
    ]
    const redApples = apples.filter(
      apple => apple.type === 'Red Delicious'
    )

    const square = n => n*n
    const plusOne = n => n+1
    const squaresPlusOne = numbers => numbers.map(
      square
    ).map(
      plusOne
    )

    return (
      <button className="Button1" onClick={
        e => console.log('I\'m a button', c, redApples[0], squaresPlusOne([7,9]))
      }>Click Me!</button>
    );
  }
})

var Testing = React.createClass({
  render: function() {
    const statement = [
      {
          type: 'credit',
          amount: 500,
          from: 'location A'
      },
      {
          type: 'debit',
          amount: 8,
          from: 'location b'
      },
      {
          type: 'debit',
          amount: 90,
          from: 'location c'
      },
      {
          type: 'debit',
          amount: 10,
          from: 'location b'
      },
      {
          type: 'debit',
          amount: 5,
          from: 'location d'
      },
      {
          type: 'debit',
          amount: 10,
          from: 'location e'
      }
    ]

    const isDebit = transaction => transaction.type === 'debit'
    const amount = transaction => transaction.amount
    const sum = (a,b) => a+b

    const log = (value, name = 'default log name: ') => console.log(name, value) || value

    const totalSpent = log(statement.filter(
        isDebit
    ).map(
        amount
    )).reduce(
        sum
    )

    return (
      <div className="testing">
        {totalSpent}
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
