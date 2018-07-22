import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

export default class LoadTestDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            msInterval: 1000
        }
    }

    handleMSIntervalChange = (event) => {
        this.setState({msInterval: Number(event.target.value)})
    };

    onTest = () => {
        this.props.onTest(this.state.msInterval);
        this.props.onClose()
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Load Test</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new meme with random image & texts after an interval
                    </DialogContentText>
                    <TextField
                        fullWidth
                        id="number"
                        label="Interval (ms)"
                        defaultValue={1000}
                        onChange={this.handleMSIntervalChange}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.onTest} color="primary">
                        Start
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
