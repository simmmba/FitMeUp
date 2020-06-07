import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  progressbar: {
    flexGrow: 1,
    width: '100%',
  },
};

class LinearDeterminate extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className='progressbar'>
        <LinearProgress variant="determinate" color='secondary' value={this.props.completed} />
      </div>
    );
  }
}

export default withStyles(styles)(LinearDeterminate);
