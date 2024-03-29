import styles from './BashOrdersList.module.scss';
import React, { Component } from 'react';
import Order from '../../../Models/Order';
import OrderController from '../../../Controllers/OrderController';
import { BiCheck } from 'react-icons/bi';
import NavigationItem, { NavItemData } from '../../NavigationMain/NavigationItem/NavigationItem';
import { ListDataManager } from '../../ui/ListDataManager';
interface Props {
  history?: any;
  match?: any;
  location?: any;
  listDataManager?: ListDataManager;
  matchPath?: boolean;
}
interface State {
  viewArray: any[];
}
class BashOrdersList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    var orders: Order[] = this.getOrders(this.props.match.params.bashId);
    this.state = {
      viewArray: this.generateViews(orders)
    }
  }

  componentDidMount() {
    if (!this.props.listDataManager) {
      return;
    }
    if (!this.props.listDataManager.getList) {
      return;
    }
    this.props.listDataManager?.getList((navItems: any, listItems: any) => {
      this.setState({
        viewArray: this.convertToList(navItems)
      });
    });
  }

  convertToList = (navItems: NavItemData[]): JSX.Element[] => {
    return navItems.map((navItem: NavItemData, index: number, array: NavItemData[]) => {
      return (<NavigationItem
        key={index}
        icon={navItem.icon}
        endIcon={navItem.endIcon}
        title={navItem.title}
        subText={navItem.subText}
        subText2={navItem.subText2}
        wrapTitle={navItem.wrapTitle}
        link={this.props.matchPath ? this.props.match.url + "/" + navItem.link : navItem.link}
        anchorText={navItem.anchorText}
        // padding={"0.1rem 0.5rem"}
        isActive={true}
      />)
    })

  }
  generateViews = (orders: Order[]): JSX.Element[] => {
    return orders.map((value: Order, index: number) => {
      var navItem: NavItemData = {
        anchorText: "₦20,000.00" + this.props.match.params.bashId,
        title: value.name,
        subText: value.dateCreated,
        endIcon: <BiCheck fontSize={"1.5rem"} />,
        wrapTitle: true,
        link: value.id ? this.props.match.url + "/" + value.id : "",
        isActive: true,
      };

      return (<NavigationItem
        key={index}
        icon={navItem.icon}
        endIcon={navItem.endIcon}
        title={navItem.title}
        subText={navItem.subText}
        subText2={navItem.subText2}
        wrapTitle={navItem.wrapTitle}
        link={navItem.link}
        anchorText={navItem.anchorText}
        // padding={"0.1rem 0.5rem"}
        isActive={true}
      />)
    })
  }
  getSnapshotBeforeUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    // console.log(prevProps.match.params.bashId);
    return null;
  }
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if (this.props.match.params.bashId !== prevProps.match.params.bashId) {
      var orders: Order[] = this.getOrders(this.props.match.params.bashId);
      this.setState({
        viewArray: this.generateViews(orders)
      })
    }

    if (this.props.match.path !== prevProps.match.path) {
      this.props.listDataManager?.getList((navItems: any, listItems: any) => {
        this.setState({
          viewArray: this.convertToList(navItems)
        });
      })
    }

  }
  shouldComponentUpdate() {
    return true;
  }

  getOrders = (bashId: string) => {
    let orders: Order[] = new OrderController().getOrders();
    return orders;
  }

  render() {
    return (
      <div className={styles.BashOrdersList}>
        <div>
          {this.state.viewArray}
        </div>
      </div>
    );
  }
}
export default BashOrdersList;