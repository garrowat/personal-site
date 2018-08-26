import React from 'react';
import Code from 'material-ui-icons/Code';
import Group from 'material-ui-icons/Group';
import Email from 'material-ui-icons/Email';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Videobox from '../components/videobox';
import dalf from '../img/videos/dalf.mp4';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  wrapper: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    left: '36.5%',
    top: '25%',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
})

class About extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    this.props.handlePageChange('about');
  }

  handleQuoteClick = (e) => {
    this.props.gandalfAppears === false
    ? this.props.showGandalf()
    : this.props.hideGandalf()
    e.preventDefault();
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
                As a lifelong computer geek, creative, and gamer, my path in life has landed me in all sorts of roles, 
                including public sector sysadmin, teacher, and SaaS training/consulting for clinicians.
            </Typography>

            <Typography variant="subheading" paragraph gutterBottom>
                I currently teach during the day and code at night, creating art or diving into a good game when life allows.
                Learning is something I'm always interested in, so I'm open to all manner of opportunities! 
                Email me at the link above with any inquiries.
            </Typography>

            <Typography variant="subheading" paragraph gutterBottom>           
              I'm an ambitious Javascript & Python student and creator who is capable with React and new to GatsbyJS. 
            </Typography>
            <Typography variant="subheading" paragraph gutterBottom>           
              My hobbies include culinary exploration, craft coffee and beer, gaming, game design, animation, and vector art.         
            </Typography>
            <Typography variant="caption" paragraph gutterBottom>
             <a href="" onClick={(e) => this.handleQuoteClick(e)} style={{ textDecoration: "none" }}>
              "All we have to decide is what to do with the time that is given us.""
             </a>
             <Modal
              open={this.props.gandalfAppears}
              onClose={this.props.hideGandalf}
             >
              <div className={classes.paper}>
                <div className={classes.wrapper}>
                  <Videobox videofile={dalf} />
                </div>
              </div>
             </Modal>
            </Typography>
        </div>
      </div>
    )
  }
};

export default withStyles(styles)(About);