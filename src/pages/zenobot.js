import React from 'react';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Fade from 'material-ui/transitions/Fade';
import Proverb from '../components/proverb';
import { CircularProgress } from 'material-ui/Progress';
import ExpansionPanel from 'material-ui/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from 'material-ui/ExpansionPanel/ExpansionPanelSummary';
import ExpansionPanelDetails from 'material-ui/ExpansionPanel/ExpansionPanelDetails';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import withRoot from '../withRoot';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: 0,
    flexGrow: 1,
  },
  proverb: {
    marginTop: theme.spacing.unit * 6,
    padding: theme.spacing.unit * 3,
    fontSize: '2em',
  },
  prompt: {
    paddingTop: theme.spacing.unit * 3,
  },
  historyPanel: {
    marginTop: theme.spacing.unit * 3,
  },
  historyDesc: {
    textAlign: 'left',
  },
  ul: {
    listStyleType: 'none',
    padding: 0,
  },
  zenoQuote: {
    paddingTop: theme.spacing.unit * 3,
  },
});

class Zenobot extends React.Component {
  
  componentDidMount() {
    this.props.handlePageChange('zenobot');
    console.log("props on mount: ", this.props);
  }

  handleChange(e) {
    const input = e.target.value;
    this.props.handleFieldChange(input);
  }

  handleGetProverb(e, input) {
    if (input) this.props.getProverb(input);
    console.log("props on get: ", this.props)
    e.preventDefault();
  }

  render() {
    const { classes, zenobot, filterColor } = this.props; 
    const { proverb, isLoading } = zenobot;

    return (
      <div className={classes.description}>
          <Typography variant="body1" style={{ fontFamily: "vt323", fontSize: "1.5em"}}>
            What troubles you, friend?
          </Typography>
        <form onSubmit={(e) => this.handleGetProverb(e, zenobot.input)}>
          <TextField 
          autoFocus={true}
          value={zenobot.input || ''}
          onChange={(e) => this.handleChange(e)}
          onBlur={(e) => this.handleGetProverb(e, zenobot.input)}
          />
        </form>
        <Paper className={classes.proverb}>
          <Typography variant="caption">Zenobot says:</Typography>
          <div className={classes.zenoQuote}>
            {
            isLoading
            ? <CircularProgress />
            : <Proverb proverb={proverb} variant="display1" />
            }
          </div>
        </Paper>
        <ExpansionPanel className={classes.historyPanel}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2" color="textSecondary">
              Show last 10 proverbs
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ul className={classes.ul}>
              {
                zenobot.lastTenProverbs.map((proverb, index) =>
                  <li key={JSON.stringify(index + proverb[1])}> 
                      <Typography paragraph={true} className={classes.historyDesc}>
                        {proverb}
                      </Typography>
                  </li>                
                )
              }
            </ul>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
};

export default withRoot(withStyles(styles)(Zenobot));