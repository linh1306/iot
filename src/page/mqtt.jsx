import React, { useEffect, useState } from 'react';
// import mqtt from 'mqtt'
const mqtt = window.mqtt;
const options = {
  clean: true,
  connectTimeout: 4000,
  clientId: 'emqx_test' + Math.random().toString(),
  username: 'admin',
  password: 'DK94VZ0tKrGQwxKXY3FE',
}
// const connectUrl = 'wss://4038011a2fdc4d9b8c3123a10cc5f620.s2.eu.hivemq.cloud:8884/mqtt'
const connectUrl = 'wss://mqtt-dashboard.com:8884/mqtt'
let client = null
const MqttComponent = () => {
  const [index, setIndex] = useState('c-s')
  const [valueFrom, setValueFrom] = useState('')
  const [valueTo, setValueTo] = useState('')
  useEffect(() => {
    client = mqtt.connect(connectUrl, options)
    client.on('connect', () => {
      const topic = (index === 'c-s' ? 's-c' : 'c-s'); // Đặt tên cho topic bạn muốn đăng ký
      client.subscribe(topic, (error) => {
        console.log((topic));
        if (!error) {
          console.log(`Subscribed to topic: ${topic}`);
        } else {
          console.error('Error subscribing:', error);
        }
      });
    });
    client.on('message', (topic, message) => {
      setValueTo(message.toString())
    });
    return () => {
      client.end();
    };
  }, [index]);

  const handlePush = () => {
    const topic = index;
    const message = valueFrom;

    client.publish(topic, message, (error) => {
      if (!error) {
        console.log('Message sent successfully');
      } else {
        console.error('Error sending message:', error);
      }
    });
  }

  return (
    <div>
      <div onClick={() => { setIndex(prop => prop === 'c-s' ? 's-c' : 'c-s') }}>{index}</div>
      <input className='border-2' type="text" value={valueFrom} onChange={(e) => setValueFrom(e.target.value)} />
      <button onClick={() => handlePush()}>Gửi</button>
      <div>{valueTo}</div>
    </div>
  );
};

export default MqttComponent;



// #include <WiFi.h>
// #include <WiFiClientSecure.h>
// #include <PubSubClient.h>
// const char* ssid = "redmi001";
// const char* password = "13062002";
// const char* serverAddress = "apimanage1306.000webhostapp.com";
// const int serverPort = 443;
// const char* apiEndpoint = "/createUser.php";

// const char* mqttServer = "mqtt://4038011a2fdc4d9b8c3123a10cc5f620.s2.eu.hivemq.cloud";
// const int mqttPort = 1883;
// const char* mqttUsername = "esp32";
// const char* mqttPassword = "1LR9UJjMRw5UG2ab9C5z";
// const char* mqttTopic = "iot-client";
// const char* mqttInputTopic = "client-iot";
// const char* mqttOutputTopic = "iot-client";

// String clientId = "ESP32Client_" + String(random(0xffff), HEX);
// WiFiClientSecure secureClient;
// WiFiClient espClient;
// PubSubClient mqttClient(espClient);

// void setup() {
//   Serial.begin(115200);
//   WiFi.begin(ssid, password);

//   while (WiFi.status() != WL_CONNECTED) {
//     delay(1000);
//     Serial.println("Connecting to WiFi...");
//   }

//   // espClient.setCACert(rootCACertificate);
//   mqttClient.setServer(mqttServer, mqttPort);
//   mqttClient.setCallback(callback);

//   while (!mqttClient.connected()) {
//     //tạo id duy nhất kết nối với broker

//     if (mqttClient.connect(clientId.c_str(), mqttUsername, mqttPassword)) {
//       //lắng nghe thông điệp gửi về (bật tắt công tắc) từ client
//       mqttClient.subscribe(mqttInputTopic);
//     } else {
//       delay(2000);
//     }
//   }
//   delay(1000);
// }



// void loop() {
//   if (WiFi.status() == WL_CONNECTED) {
//     if (secureClient.connect(serverAddress, serverPort)) {
//       secureClient.print(String("GET ") + apiEndpoint + " HTTP/1.1\r\n" + "Host: " + serverAddress + "\r\n" + "Connection: close\r\n\r\n");
//       secureClient.stop();
//     } else {
//       Serial.println("Connection failed");
//     }

//     if (mqttClient.connected()) {
//       // Random number between 10 and 99
//       int randomValue = random(10, 100);
//       String message = String(randomValue);
//       //gửi thông điệp (dữ liệu trả về từ cảm biến) đến client
//       mqttClient.publish(mqttOutputTopic, message.c_str());
//       mqttClient.loop();
//     } else {
//       reconnect();
//     }
//   }
//   // millis()
//   delay(2000);
// }


// void reconnect() {
//   while (!mqttClient.connected()) {
//     if (mqttClient.connect(clientId.c_str(), mqttUsername, mqttPassword)) {
//       mqttClient.subscribe(mqttInputTopic);
//     } else {
//       delay(2000);
//     }
//   }
// }

// void callback(char* topic, byte* payload, unsigned int length) {
//   String message = "";
//   for (int i = 0; i < length; i++) {
//     message += (char)payload[i];
//   }
//   Serial.println("Message content: " + message);
// }


//*


// #include <WiFi.h>
// #include <WiFiClientSecure.h>
// #include <PubSubClient.h>
// const char* ssid = "redmi001";
// const char* password = "13062002";
// const char* serverAddress = "apimanage1306.000webhostapp.com";
// const int serverPort = 443;
// const char* apiEndpoint = "/createUser.php";

// // const char* mqttServer = "4038011a2fdc4d9b8c3123a10cc5f620.s2.eu.hivemq.cloud";
// const char* mqttServer = "mqtt-dashboard.com";
// const int mqttPort = 1883;
// const char* mqttUsername = "esp32";
// const char* mqttPassword = "1LR9UJjMRw5UG2ab9C5z";
// const char* mqttTopic = "iot-client";
// const char* mqttInputTopic = "client-iot";
// const char* mqttOutputTopic = "iot-client";

// String clientId = "ESP32Client_" + String(random(0xffff), HEX);
// WiFiClientSecure secureClient;
// WiFiClient espClient;
// PubSubClient mqttClient(espClient);

// void setup() {
//   Serial.begin(115200);
//   WiFi.begin(ssid, password);

//   while (WiFi.status() != WL_CONNECTED) {
//     Serial.println("Connecting to WiFi...");
//     delay(1000);
//   }
//   Serial.println("Connecting to mqtt...");
//   // espClient.setCACert(rootCACertificate);
//   mqttClient.setServer(mqttServer, mqttPort);
//   mqttClient.setCallback(callback);

//   while (!mqttClient.connected()) {
//     //tạo id duy nhất kết nối với broker

//     if (mqttClient.connect(clientId.c_str(), mqttUsername, mqttPassword)) {
//       //lắng nghe thông điệp gửi về (bật tắt công tắc) từ client
//       Serial.println("Connecting to mqtt-2...");
//       mqttClient.subscribe(mqttInputTopic);
//     } else {
//       Serial.println("reConnecting to mqtt ...");
//       delay(2000);
//     }
//   }
//   delay(1000);
// }



// void loop() {
//   if (WiFi.status() == WL_CONNECTED) {
//     // if (secureClient.connect(serverAddress, serverPort)) {
//     //   secureClient.print(String("GET ") + apiEndpoint + " HTTP/1.1\r\n" + "Host: " + serverAddress + "\r\n" + "Connection: close\r\n\r\n");
//     //   secureClient.stop();
//     // } else {
//     //   Serial.println("Connection failed");
//     // }

//     if (mqttClient.connected()) {
//       // Random number between 10 and 99
//       int randomValue = random(10, 100);
//       String message = String(randomValue);
//       //gửi thông điệp (dữ liệu trả về từ cảm biến) đến client
//       mqttClient.publish(mqttOutputTopic, message.c_str());
//       mqttClient.loop();
//     } else {
//       reconnect();
//     }
//   }
//   // millis()
//   delay(2000);
// }


// void reconnect() {
//   while (!mqttClient.connected()) {
//     if (mqttClient.connect(clientId.c_str(), mqttUsername, mqttPassword)) {
//       mqttClient.subscribe(mqttInputTopic);
//     } else {
//       delay(2000);
//     }
//   }
// }

// void callback(char* topic, byte* payload, unsigned int length) {
//   String message = "";
//   for (int i = 0; i < length; i++) {
//     message += (char)payload[i];
//   }
//   Serial.println("Message content: " + message);
// }


/////////////////////////////////////////////////////////////////////////
// #include <WiFi.h>
// #include <HTTPClient.h>

// const char* ssid = "redmi001";
// const char* password = "13062002";

// HTTPClient http;

// void setup() {
//   Serial.begin(115200);

//   // Kết nối đến mạng WiFi
//   WiFi.begin(ssid, password);
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(1000);
//     Serial.println("Connecting to WiFi...");
//   }
// }

// void update_data_history_to_be() {
//   String apiUrl = "https://apimanage1306.000webhostapp.com/createUser.php";
//   String payload = "name=linhpl&password=73453422";
//   http.begin(apiUrl + "?" + payload);
//   int httpResponseCode = http.GET();

//   if (httpResponseCode <= 0) {
//     Serial.print("HTTP Response code: ");
//   }
//   http.end();
// }

// void loop() {

//   delay(10000);
// }






// #include <WiFi.h>
// #include <DHT.h>
// #include <WiFiClientSecure.h>
// #include <PubSubClient.h>
// #include <string>

// const char* ssid = "redmi001";
// const char* password = "13062002";
// const char* mqttServer = "mqtt-dashboard.com";
// const int mqttPort = 1883;
// const char* mqttUsername = "esp32";
// const char* mqttPassword = "1LR9UJjMRw5UG2ab9C5z";
// const char* mqttOutputTopic = "s-c";
// String clientId = "ESP32Client_" + String(random(0xffff), HEX);
// std::string mess_to_client = "";

// WiFiClientSecure secureClient;
// WiFiClient espClient;
// PubSubClient mqttClient(espClient);

// #define DHTPIN 4       // Chân kết nối cảm biến DHT22
// #define DHTTYPE DHT22  // Loại cảm biến (DHT11 hoặc DHT22)
// DHT dht(DHTPIN, DHTTYPE);


// void setup() {
//   Serial.begin(115200);

//   // Kết nối đến mạng WiFi
//   WiFi.begin(ssid, password);
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(1000);
//     Serial.println("Connecting to WiFi...");
//   }

//   dht.begin();  // Khởi động cảm biến DHT

//   // espClient.setCACert(rootCACertificate);
//   mqttClient.setServer(mqttServer, mqttPort);
//   // mqttClient.setCallback(callback);

//   while (!mqttClient.connected()) {
//     if (mqttClient.connect(clientId.c_str(), mqttUsername, mqttPassword)) {
//     } else {
//       Serial.println("reConnecting to mqtt ...");
//       delay(1000);
//     }
//   }
// }



// void doc_nhietDo_doAm() {
//   // Đọc dữ liệu từ cảm biến
//   float humidity = dht.readHumidity();
//   float temperature = dht.readTemperature();

//   // Kiểm tra lỗi đọc dữ liệu
//   if (!isnan(humidity) && !isnan(temperature)) {
//     mess_to_client += "{ \"name\": \"độ ẩm\", \"value\":" + std::to_string(humidity) + ", \"unit\": \"%\" }, ";
//     mess_to_client += "{ \"name\": \"nhiệt độ\", \"value\": " + std::to_string(temperature) + ", \"unit\": \"°C\" },";
//   }
// }

// void loop() {
//   mess_to_client = "[";

//   if (WiFi.status() == WL_CONNECTED) {
//     if (mqttClient.connected()) {
//       doc_nhietDo_doAm();
//     }
//   }
//   mess_to_client = mess_to_client.substr(0, mess_to_client.length() - 1);
//   mess_to_client += "]";
//   mqttClient.publish(mqttOutputTopic, mess_to_client.c_str());
//   mqttClient.loop();
//   delay(2000);
// }


// ví dụ 1
// "độ ẩm-4/ánh sáng-5"
// => 
// ["độ ẩm", "ánh sáng"]
// [4,5]
// ví dụ 2
// "2-true/3-false"
// =>
// [2,3]
// ["true","false"]