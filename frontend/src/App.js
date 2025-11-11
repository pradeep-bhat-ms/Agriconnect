import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from './Layout'

// Screens
import SeedProductScreen from './screens/Product_Seed/SeedProductScreen'

// Admin: Seeds
import SeedList from './components/DashBoard/ProductList/SeedList/SeedList'
import SeedListEdit from './screens/ProductListEdit/SeedListEdit/SeedListEdit'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Layout />
        <Switch>
          {/* Public product page */}
          <Route path="/seed/:id" component={SeedProductScreen} exact />

          {/* Admin seeds list & edit */}
          <Route path="/admin/seed" component={SeedList} exact />
          <Route path="/admin/productlist/seed/:id/edit" component={SeedListEdit} exact />
        </Switch>
      </div>
    </Router>
  )
}

export default App
