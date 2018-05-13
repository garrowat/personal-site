import React from 'react';
import Typography from 'material-ui/Typography';
import Fade from 'material-ui/transitions/Fade';

export default class Zenobot extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    this.props.handlePageChange('zenobot');
  }

  render() {
    const classes = this.props.classes;

    return (
      <Fade in>
        <div className={classes.description}>
            <Typography type="body1">
                Zenobot awaits your input.
            </Typography>
        </div>
      </Fade>
    )
  }
};