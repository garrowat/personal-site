import React from 'react';
import Code from 'material-ui-icons/Code';
import Group from 'material-ui-icons/Group';
import Email from 'material-ui-icons/Email';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';

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
      <div>
        <div className={classes.links}>
          <Typography variant="caption">Contact me at: </Typography>       
          <a href="https://github.com/garrowat" style={{textDecoration: "none"}}>
            <Tooltip title="GitHub">
              <IconButton color="secondary">
                <Code />
              </IconButton>
            </Tooltip>
          </a>
          <a href="https://www.linkedin.com/in/garrowat/" style={{textDecoration: "none"}}>
            <Tooltip title="LinkedIn">
              <IconButton color="secondary">
                <Group />
              </IconButton>
            </Tooltip>
          </a>
          <a href="mailto:garrettbauer@gmail.com" style={{textDecoration: "none"}}>
            <Tooltip title="Email">
              <IconButton color="secondary">
                <Email />
              </IconButton>
            </Tooltip>
          </a>
        </div>
        <div className={classes.description}>
            <Typography variant="subheading" paragraph gutterBottom>
                As a lifelong computer geek and gamer, my path in life has landed me in all sorts of roles, 
                from public sector sysadmin to SaaS training/consulting for clinicians.
            </Typography>

            <Typography variant="subheading" paragraph gutterBottom>
                I currently teach during the day and code at night, diving into a good game when life allows.
                I'd love to bring my wide-ranging experience, front-end skills, and deep learning curiosity to your project or company.
            </Typography>

            <Typography variant="subheading" paragraph gutterBottom>           
                Javascript & Python developer. Capable with React and GatsbyJS. Game design and vector art hobbyist. Believer in Be Excellent to Each Other.
            </Typography>
        </div>
      </div>
    )
  }
};