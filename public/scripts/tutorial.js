var CommentBox = React.createClass({
  render: function () {
    return (
      <div className="CommentBox">
        <h1>Comments</h1>
        Hello, world! I am a CommentBox.
        <CommentList data="{this.props.data}" />
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
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var data = [
  {id: 1, author: "Jim Bob", text: "This is a comment"},
  {id: 2, author: "Some Guy", text: "This is a differect comment"}
];

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

    // First ecample
    // const isDebit = transaction => transaction.type === 'debit'
    // const amount = transaction => transaction.amount
    // const sum = (a,b) => a+b
    //
    // const log = (value, name = 'default log name: ') => console.log(name, value) || value
    //
    // const totalSpent = log(statement.filter(
    //     isDebit
    // ).map(
    //     amount
    // )).reduce(
    //     sum
    // )

    // Second example
    const debitTransactions = statement => statement.filter(
        transaction => transaction.type === 'debit'
    )

    const creditTransactions = statement => statement.filter(
        transaction => transaction.type === 'credit'
    )

    const amount = statement => statement.map(
        transaction => transaction.amount
    )

    const summation = values => values.reduce(
        (previous, current) => previous + current
    )

    const totalAmount = (statement, filter, value, operation) => operation(
        value(
            filter(
                statement
            )
        )
    )

    console.log(totalAmount(
        statement,
        debitTransactions,
        amount,
        summation
    ))

    // Third example
    // const keyIsValue = (key, value) => element => element[key] === value
    // const debitTransactions = statement => statement.filter(keyIsValue('type', 'debit'))
    // const creditTransactions = statement => statement.filter(keyIsValue('type', 'credit'))
    //
    // const byKey = key => element => element[key]
    // const amount = statement => statement.map(byKey('amount'))
    //
    // const summation = (previous, current) => previous + current
    // const arraySummation = arr => arr.reduce(summation)
    //
    // const totalAmount = (statement, filter, value, operation) => operation(
    //     value(
    //         filter(
    //             statement
    //         )
    //     )
    // )
    //
    // console.log(totalAmount(
    //     statement,
    //     debitTransactions,
    //     amount,
    //     arraySummation
    // ))

    // Switch {totalAmount} out with totalSpent to view the results of the First example

    return (
      <div className="testing">
        {totalAmount}
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);
