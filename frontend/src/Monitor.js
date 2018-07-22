/**
 * Lib imports
 */
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import SocketIO from 'socket.io-client'

/**
 * Project imports
 */

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
});

class Monitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pods: [],
            podHitId: null
        };
        this.wsClient = null
    }

    componentDidUpdate(prevProps) {
        if (this.props.monitorWS !== prevProps.monitorWS) {
            if (this.wsClient) {
                this.wsClient.close()
            }
            this.wsClient = SocketIO(this.props.monitorWS);
            this.wsClient
                .on('pods', (rawPods) => this.setState({pods: JSON.parse(rawPods)}))
                .on('hit', (rawHitPodId) => this.podHit(JSON.parse(rawHitPodId)))
        }
    }

    componentDidMount() {
        this.wsClient = SocketIO(this.props.monitorWS);
        this.wsClient
            .on('pods', (rawPods) => this.setState({pods: JSON.parse(rawPods)}))
            .on('hit', (rawHitPodId) => this.podHit(JSON.parse(rawHitPodId)))
    }

    podHit({podId}) {
        this.setState({podHitId: podId});
        setTimeout(() => {
            this.setState({podHitId: null})
        }, 500)
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <List component="nav">
                    {this.state.pods.map(podId =>
                        (<ListItem button key={podId}>
                            {this.state.podHitId === podId &&
                            <ListItemIcon>
                                <StarIcon/>
                            </ListItemIcon>}
                            <ListItemText inset primary={podId}/>
                        </ListItem>)
                    )}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(Monitor);
