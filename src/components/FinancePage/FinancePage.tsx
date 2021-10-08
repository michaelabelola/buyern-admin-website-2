import { BiCheck, BiErrorAlt, BiLoader } from 'react-icons/bi';
import { Switch, Route, Redirect } from 'react-router';
import { NavItemData } from '../NavigationMain/NavigationItem/NavigationItem';
import OrderPage from '../OrderPage/OrderPage';
import ListView from '../ui/ListView/ListView';
import { SearchBarConstructor } from '../ui/SplitViewTemplateComponent/SplitViewLeftSide/SplitViewLeftSide';
import { SplitViewTemplateComponent } from '../ui/SplitViewTemplateComponent/SplitViewTemplateComponent';
import TabNavigation, { TabNavigationItem } from '../ui/TabNavigation/TabNavigation';
// import styles from '." + this.props.match.path + "Page.module.scss';

class FinancePage extends SplitViewTemplateComponent {
  list1: NavItemData[] = [];
  payoutList: NavItemData[] = [];
  // basePath: string = "/business/finances";
  // basePath: string = "/finance";
  constructor(props: any) {
    super(props);

    this.tabNav = (
      <TabNavigation>
        <TabNavigationItem link={this.props.match.url + "/transactions"} text={"Transactions"} />
        <TabNavigationItem link={this.props.match.url + "/payouts"} text={"Payouts"} />
        <TabNavigationItem link={this.props.match.url + "/autoPayout"} text={"Auto Payouts"} />
      </TabNavigation>
    );
    this.mainPageSwitch =
      (<Switch>
        <Route path={this.props.match.path + this.props.match.path + "/:orderId"} component={OrderPage} />
      </Switch>
      );
    this.LeftListSwitch = (
      <Switch>
        {/* <Route path={this.props.match.path + "/autoPayout"} render={(props) => (<ListView {...props} navItems={this.payoutList} />)} />, */}
        <Route path={this.props.match.path + "/payouts"} render={(props) => (<ListView {...props} navItems={this.payoutList} />)} />,
        <Route path={[this.props.match.path + "/transactions"]} render={(props) => (<ListView {...props} navItems={this.list1} />)} />,
        <Route exact path={[this.props.match.path]} render={(props) => (<Redirect {...props} to={this.props.match.path + "/transactions"}/>)} />,
      </Switch>
    )
    this.SearchSwitch = (<Switch>
      <Route path={this.props.match.path + "/history"} render={(props) => (<SearchBarConstructor {...props} searchType={"Orders"} placeHolder={"Search Orders"} callback={() => { }} />)} />
      <Route path={this.props.match.path + "/all"} render={(props) => (<SearchBarConstructor {...props} searchType={"Orders"} placeHolder={"Search All Orders"} callback={() => { }} />)} />
      <Route path={[this.props.match.path, this.props.match.path + "/new"]} render={(props) => (<SearchBarConstructor {...props} searchType={"Orders"} placeHolder={"Search New Orders"} callback={() => { }} />)} />
    </Switch>)
    this.payoutList = [
      {
        title: "Add New",
        wrapTitle: true,
        link: "/yjdty",
        isActive: true,
      },
      {
        title: "Export Data - CSV",
        wrapTitle: true,
        link: "/jdtyry",
        isActive: true,
      },
      {
        anchorText: "Default - NG",
        title: "Abel Michael Olalekan",
        subText: "Bank Transfer",
        subText2: "0511051552 - (GTBank)",
        endIcon: <BiCheck fontSize={"1.5rem"} />,
        wrapTitle: true,
        link: "/dghsryhsrt",
        isActive: true,
      },
      {
        anchorText: "Default - UK",
        title: "Abel Michael Olalekan",
        subText: "Card Transfer",
        subText2: "**** **** **** 4242 - (Mastercard)",
        wrapTitle: true,
        link: "/bsrnrs",
        isActive: true,
      }
    ];
    this.list1 = [
      {
        title: "Export Data - CSV",
        wrapTitle: true,
        link: this.props.match.path + "/jdtyry",
        isActive: true,
      },
      {
        anchorText: "5th June 2021",
        title: "Order",
        subText: "completed",
        endIcon: <BiCheck fontSize={"1.5rem"} />,
        wrapTitle: true,
        link: "/bsrnrs",
        isActive: true,
      },
      {
        anchorText: "12:30 5th June 2021",
        title: "Payout",
        subText: "Processing",
        endIcon: <BiLoader fontSize={"1.5rem"} />,
        wrapTitle: true,
        link: "/rtnry",
        isActive: true,
      },
      {
        anchorText: "5th June 2021",
        title: "Order",
        subText: "completed",
        endIcon: <BiErrorAlt fontSize={"1.5rem"} />,
        wrapTitle: true,
        link: "/ratnywjya",
        isActive: true,
      },
    ]

  }
}
export default FinancePage;