/* @flow */
'use strict';

import React, { Component } from 'react';
import {Picker, Modal,View} from 'react-native';
import computeProps from '../Utils/computeProps';

import { Text,List,Icon,Container,Content,ListItem,Button,Header,Title,Left,Right,Body } from 'native-base';
import _ from 'lodash';
import { connectStyle } from '@shoutem/theme';
import mapPropsToStyleNames from '../Utils/mapPropsToStyleNames';

class PickerNB extends Component {

    constructor(props) {
        super(props);
        console.log("props",this.props.children);
        const ds = new List.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          modalVisible : false,
          currentLabel: this.getLabel(props),
          dataSource: ds.cloneWithRows(this.props.children),
        }
    }

    componentWillReceiveProps(nextProps) {
      const currentLabel = this.state.currentLabel;
      const nextLabel = this.getLabel(nextProps);

      if (currentLabel !== nextLabel) {
        this.setState({
          currentLabel: nextLabel
        });
      }
    }

    getInitialStyle() {
        return {
            picker: {
                // alignItems: 'flex-end'
            },
            pickerItem: {

            }
        }
    }
    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    prepareRootProps() {
        var defaultProps = {
            style: this.getInitialStyle().picker,
            itemStyle: this.getInitialStyle().pickerItem
        };

        return computeProps(this.props, defaultProps);
    }

    getLabel(props) {
        const item = _.find(props.children, child => {
            return child.props.value == props.selectedValue;
        });

        return _.get(item, 'props.label');
    }

    modifyHeader() {
        let childrenArray = React.Children.toArray(this.props.headerComponent.props.children);
        let newChildren = [];
        childrenArray.forEach((child) => {
            if (child.type==Button) {
                newChildren.push(React.cloneElement(child, {onPress: () => {this._setModalVisible(false)}}))
            } else {
                newChildren.push(child)
            }
        });
        return <Header {...this.props.headerComponent.props} > {newChildren}</Header>
    }

    renderIcon() {
        return React.cloneElement(this.props.iosIcon, {style: {fontSize: 22, lineHeight: 26, color: '#7a7a7a' }})
    }

    renderHeader() {
        return (this.props.headerComponent) ? this.modifyHeader() : (<Header >
            <Left><Button  style={{shadowOffset: null,shadowColor: null,shadowRadius: null,shadowOpacity: null}} transparent onPress={() => {this._setModalVisible(false)}}><Text>Back</Text></Button></Left>
            <Body><Title>Select One</Title></Body>
            <Right />
        </Header>)
    }

    render() {
        return (
        <View ref={c => this._root = c}>
            <Button style={{shadowOffset: null,shadowColor: null,shadowRadius: null,shadowOpacity: null}}
                transparent
                onPress={() => {this._setModalVisible(true)}}>
                <Text>{this.state.currentLabel}</Text>
                {(this.props.iosIcon == undefined) ? <Icon name="ios-home" style={{opacity: 0}} /> : this.renderIcon()}
            </Button>
            <Modal animationType='slide'
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {this._setModalVisible(false)}}
                >
                <Container>
                    {this.renderHeader()}
                    <Content>
                        <List dataSource={this.state.dataSource}
                            renderRow={(child) =>
                                <ListItem  button onPress={() => {this._setModalVisible(false);this.props.onValueChange(child.props.value); this.setState({current: child.props.label})}} >
                                    <Text >{child.props.label}</Text>
                                    <Right>
                                    {(child.props.value===this.props.selectedValue) ?
                                        (<Icon name='ios-checkmark-outline' />)
                                        :
                                        (<Icon name='ios-checkmark-outline' style={{color: 'transparent'}} />)
                                    }
                                    </Right>
                                </ListItem>
                            } />
                    </Content>
                </Container>
            </Modal>
        </View>
        );
    }

}

PickerNB.Item = React.createClass({

    render: function() {
        return(
          <Picker.Item {...this.props()}/>
          );
    }
});

PickerNB.propTypes = {
  ...View.propTypes,
};

const StyledPickerNB = connectStyle('NativeBase.PickerNB', {}, mapPropsToStyleNames)(PickerNB);

export {
  StyledPickerNB as PickerNB,
};