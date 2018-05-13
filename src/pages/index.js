import React from 'react';
import Typography from 'material-ui/Typography';
import Fade from 'material-ui/transitions/Fade';

export default class About extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    this.props.handlePageChange('about');
  }

  render() {
    const classes = this.props.classes;

    return (
      <Fade in>
        <div className={classes.description}>
            <Typography variant="body1">
                Garrett is a lifelong computer geek and gamer whose path in life has landed him in all sorts of roles, from government IT admin to SaaS training/consulting for Physicians. 
            </Typography>
            <br />
            <Typography variant="body1">
                He currently teaches during the day and codes at night.  
            </Typography>
            <br />
            <Typography variant="body1">           
                Javascript & Python developer. Capable with React and GatsbyJS. Game design and vector art hobbyist. Believer in Be Excellent to Each Other.
            </Typography>
        </div>
      </Fade>
    )
  }
};