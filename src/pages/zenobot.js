import React from 'react';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Fade from 'material-ui/transitions/Fade';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: 0,
    flexGrow: 1,
  },
});

class Zenobot extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    this.props.handlePageChange('zenobot');
  }

  handleChange(e) {
    const input = e.target.value;
    this.props.handleFieldChange(input)
  }

  handleGetProverb(e) {
    e.preventDefault()
    const input = e.target.value;
    this.props.getProverb(input);
  }

  render() {
    const { classes, zenobot } = this.props;
    console.log(this.props)

    return (
      <div className={classes.description}>
        <Typography variant="body1">
          Zenobot awaits your input.
        </Typography>

        <form onSubmit={(e) => this.handleGetProverb(e)}>
          <TextField 
          autoFocus={true}
          value={zenobot.input}
          onChange={(e) => this.handleChange(e)}
          onBlur={(e) => this.handleGetProverb(e)}
          />
        </form>

        <Typography variant="display1">
          <br />
          {zenobot.proverb}
        </Typography>
      </div>
    )
  }
};

export default withStyles(styles)(Zenobot);