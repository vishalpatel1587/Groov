import App from "./App";
import ReactDOM from "react-dom";

import { logger } from "redux-logger";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";

import rootSaga from "./store/sagas/index";
import { rootReducer } from "./store/reducers/rootReducers";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const middleware: any[] = [sagaMiddleware];
if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,

  document.getElementById("root")
);
