import AsyncStorage from "@react-native-async-storage/async-storage";
async function authenticate(credentials) {
  const url = "https://staging.andanet.com/api/login";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  const token = response.token;

  await AsyncStorage.setItem("token", token);

  return token;
}
async function addItem(credentials) {
  const token = await getToken();

  const url = "https://staging.andanet.com/api/cart/items";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  const data = response;

  return data;
}

async function addInventoryNotification(credentials) {
  const token = await getToken();

  const url = "https://staging.andanet.com/api/analytics/event";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  const data = response;

  return data;
}

async function updateItem(credentials) {
  const token = await getToken();

  const url = "https://staging.andanet.com/api/cart/items";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  const data = response;

  return data;
}
export async function cartValidate() {
  const token = await getToken();

  const url = "https://staging.andanet.com/api/cart/validate";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());

  const data = response;

  return data;
}
export async function checkOutCart(orderId) {
  const token = await getToken();

  const url = `https://staging.andanet.com/api/order/${orderId}/checkout?paymentType=invoice`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());

  const data = response;

  return data;
}

export async function emptyCart(credentials) {
  const token = await getToken();

  const url = "https://staging.andanet.com/api/cart";
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  const data = response;

  return data;
}

export function login(body) {
  const credentials = {
    username: body.email,
    password: body.password,
  };
  return authenticate(credentials);
}
export function addItems(body) {
  const credentials = {
    updateItemDtos: [
      {
        accountId: body.accountId,
        quantity: 1,
        skuID: body.skuId,
      },
    ],
  };
  return addItem(credentials);
}
export function deleteItems(body) {
  const credentials = {
    updateItemDtos: [
      {
        orderItemId: body.Id,
        quantity: 0,
      },
    ],
  };
  return updateItem(credentials);
}
export function updateValue(body) {
  const credentials = {
    updateItemDtos: [
      {
        accountId: body.accountId,
        quantity: body.updateValue,
        skuID: body.skuId,
      },
    ],
  };
  return addItem(credentials);
}

export async function addInventoryNotifications(body) {
  const id = await uuid();
  const credentials = {
    params: {
      correlationId: id,
      skuId: 311600,
      type: "DELETE",
      website: "AndaNet",
    },
    type: "ADD_INVENTORY_NOTIFICATION",
    userState: {
      catalogRequest: {
        account: {
          firstLineOfAddress: "",
          id: 1567,
          restOfAddress: "",
        },
        customer: {
          id: 7,
        },
      },
      customer: {
        id: 7,
      },
      principal: {
        anonymous: false,
        principal: "7ddg@andanet",
      },
      userType: "CUSTOMER",
    },
  };
  return addInventoryNotification(credentials);
}

export const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

export const uuid = async () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};
