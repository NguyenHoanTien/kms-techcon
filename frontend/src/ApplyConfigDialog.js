import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

export default class ApplyConfigDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            apiHTTP: 'http://localhost:3001',
            monitorWS: 'ws://localhost:3003'
        }
    }

    handleAPIHTTPChange = (event) => {
        this.setState({apiHTTP: event.target.value})
    };

    handleMonitorWSChange = (event) => {
        this.setState({monitorWS: event.target.value})
    };

    onApplyConfig = () => {
        const {apiHTTP, monitorWS} = this.state;
        this.props.onApplyConfig({apiHTTP, monitorWS});
        this.props.onClose()
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Apply Config</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This is just for demo purpose. In real-world apps, those variables should be included in the
                        static file.
                    </DialogContentText>
                    <TextField
                        fullWidth
                        label="API URL"
                        value={this.state.apiHTTP}
                        onChange={this.handleAPIHTTPChange}
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Monitor WS URL"
                        value={this.state.monitorWS}
                        onChange={this.handleMonitorWSChange}
                        type="text"
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
                    <Button onClick={this.onApplyConfig} color="primary">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
