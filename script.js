document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("visited") != "done") {
        // generateUniqueId(3);
        // localStorage.setItem("uniqueId", uniqueId);
        let container = document.querySelector(".greetings");
        let timeNow = new Date().getHours();
        console.log(timeNow);
        let greeting =
          timeNow >= 5 && timeNow < 12
            ? "Good Morning"
            : timeNow >= 12 && timeNow < 18
            ? "Good Afternoon"
            : "Good evening";
        container.innerHTML = `<p>${greeting} 👋</p>`;
        setTimeout(showToastInfo, 500);
    } 
    else {
    }
    localStorage.setItem("visited", "done");
}
);



let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if(pos>100){
        scrollProgress.style.display = "grid";
    } else{
        scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

function scrollToElement(elementSelector, instance = 0) {
    // Select all elements that match the given selector
    const elements = document.querySelectorAll(elementSelector);
    // Check if there are elements matching the selector and if the requested instance exists
    if (elements.length > instance) {
        // Scroll to the specified instance of the element
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1.addEventListener('click', () => {
    scrollToElement('.header');
});

link2.addEventListener('click', () => {
    // Scroll to the second element with "header" class
    scrollToElement('.header', 1);
});

link3.addEventListener('click', () => {
    scrollToElement('.column');
});

document.addEventListener('DOMContentLoaded', function() {
  const toggleChatButton = document.getElementById('toggle-chat');
  const closeChatButton = document.getElementById('close-chat');
  const chatBox = document.getElementById('chat-box');
  const userMessageInput = document.getElementById('user-message');
  const sendMessageButton = document.getElementById('send-message');
  const imageUploadInput = document.getElementById('image-upload');
  
  let chatTimeout;

  
  // Toggle chat
  toggleChatButton.addEventListener('click', function() {
    if (chatBox.style.display === 'none') {
      chatBox.style.display = 'block';
      toggleChatButton.textContent = 'Close Chat';
    //   userMessageInput.value = ''; // Clear input value
      clearTimeout(chatTimeout); // Clear previous timeout
    } else {
      chatBox.style.display = 'none';
      toggleChatButton.textContent = 'Open Chat';
    }
  });

  // Send message
  function sendMessage() {
    const message = userMessageInput.value;
    if (message.trim() !== '') {
        // const formattedMessage = `[${uniqueId}] ${message}`;
        let unique = localStorage.getItem("uniqueId");
        sendMessageToTelegram(`[From ${deviceUniqueId}]: ${message}`);
    }
  }

  sendMessageButton.addEventListener('click', sendMessage);

  // Listen for Enter key press
  userMessageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent Enter from creating a new line
      sendMessage();
    }
  });
  
  function startChatTimeout() {
    chatTimeout = setTimeout(function() {
      if (!userMessageInput.contains(document.activeElement)) {
        chatBox.style.display = 'none';
        toggleChatButton.textContent = 'Open Chat';
      }
    }, 10*1000); // seconds
  }

  // Restart timeout on user interaction
  document.addEventListener('mousemove', startChatTimeout);
  document.addEventListener('keydown', startChatTimeout);
  

function sendMessageToTelegram(message) {
  const botToken = '6412404927:AAEm1RFSUt_euNQetr-ScqtIQ5Doq9ct5HE';
  const chatId = '1173194067';
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const data = {
    chat_id: chatId,
    text: message,
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    // console.log('Message sent successfully:', data);

    // Clear the input
    userMessageInput.value = '';

    // Show success alert
    showToastTrue();
    chatBox.style.display = 'none';
  })
  .catch(error => {
    showToastFalse();
  });
}
  chatBox.style.display = 'none';
});

let x;
let toastTrue = document.getElementById("toastTrue");
let toastFalse = document.getElementById("toastFalse");
let toastInfo = document.getElementById("toastInfo");
let toastMessage = document.getElementById("toastMessage");
function playNotif(){
    var customSound = document.getElementById("customSound");
    customSound.play();
}
function showToastTrue(){
    playNotif();
    clearTimeout(x);
    toastTrue.style.transform = "translateX(0)";
    x = setTimeout(()=>{
        toastTrue.style.transform = "translateX(-440px)"
    }, 4000);
}
function showToastFalse(){
    playNotif();
    clearTimeout(x);
    toastFalse.style.transform = "translateX(0)";
    x = setTimeout(()=>{
        toastFalse.style.transform = "translateX(-440px)"
    }, 4000);
}
function showToastInfo(){
    playNotif();
    clearTimeout(x);
    toastInfo.style.transform = "translateX(0)";
    x = setTimeout(()=>{
        toastInfo.style.transform = "translateX(-440px)"
    }, 4000);
}
function showToastMessage(){
    playNotif();
    clearTimeout(x);
    toastMessage.style.transform = "translateX(0)";
    x = setTimeout(()=>{
        toastMessage.style.transform = "translateX(-440px)"
    }, 10000);
}
function closeToast(){
    toastTrue.style.transform = "translateX(-440px)";
    toastFalse.style.transform = "translateX(-440px)";
    toastInfo.style.transform = "translateX(-440px)";
    toastMessage.style.transform = "translateX(-440px)";
}


// Fungsi untuk menghasilkan Unique ID acak
function generateUniqueId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let uniqueId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    uniqueId += characters.charAt(randomIndex);
  }

  return uniqueId;
}

// Mendapatkan Unique ID perangkat dari local storage
let deviceUniqueId = localStorage.getItem('deviceUniqueId');
if (!deviceUniqueId) {
  // Jika Unique ID belum ada, maka buat dan simpan di local storage
  deviceUniqueId = generateUniqueId(3); // Ganti dengan panjang yang Anda inginkan
  localStorage.setItem('deviceUniqueId', deviceUniqueId);
}
console.log(`Kode Unik: ${deviceUniqueId}`);

// Konfigurasi bot Telegram
const botToken = '6412404927:AAEm1RFSUt_euNQetr-ScqtIQ5Doq9ct5HE'; // Ganti dengan token bot Anda
const chatId = '1173194067'; // Ganti dengan chat ID Anda
const updateInterval = 500; // Interval dalam milidetik untuk polling (contoh: setiap 3 detik)

let lastReceivedMessageId = null;
let isPolling = true;

// // Fungsi untuk mengekstrak Unique ID dari pesan
// function extractUniqueId(message) {
//   const uniqueIdRegex = /\[(.*?)\]/;
//   const match = message.match(uniqueIdRegex);
//   if (match) {
//     return match[1];
//   }
//   return null; // Mengembalikan null jika tidak ada Unique ID dalam pesan
// }

// let text = "";
// // Fungsi untuk mengirim pesan ke Telegram
// function sendTelegramMessage(text) {
//   const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
//   const formData = new FormData();
//   formData.append('chat_id', chatId);
//   formData.append('text', text);

//   fetch(apiUrl, {
//     method: 'POST',
//     body: formData,
//   })
//     .then(response => response.json())
//     .then(data => {
//       if (data.ok) {
//         console.log('Pesan berhasil dikirim ke Telegram:', text);
//       } else {
//         console.error('Gagal mengirim pesan ke Telegram:', data.description);
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }

// // Fungsi untuk mengolah pesan yang diterima
// var checkText = "false";
// function processReceivedMessage(receivedMessage) {
//   const messageUniqueId = extractUniqueId(receivedMessage);
//   console.log(messageUniqueId);

//   if (localStorage.getItem("visit") == null) {
//     localStorage.setItem("visit", "true");
//   } else {
//     if (messageUniqueId === deviceUniqueId) {
//       const messageContent = receivedMessage.replace(`[${messageUniqueId}] `, '');
//       // Periksa apakah pesan sudah ditampilkan sebelumnya
//       const lastDisplayedMessage = localStorage.getItem('lastDisplayedMessage');
//       // Periksa panjang pesan, maksimal 96 karakter
//       if (messageContent.length > 96) {
//           checkText = "false";
          
//       }
//     else{
//         checkText = "true";
//     }

//       if (lastDisplayedMessage !== messageContent && checkText === "true") {
//         // Tampilkan pesan hanya jika berbeda dengan pesan sebelumnya
//         sendTelegramMessage(`Pesan: ${messageContent} berhasil terkirim`)
//         const container = document.querySelector(".message");
//         container.innerHTML = `<p>${messageContent}</p>`;
//         showToastMessage();
//         // Simpan pesan sebagai pesan terakhir yang ditampilkan
//         localStorage.setItem('lastDisplayedMessage', messageContent);
//         console.log(`Pesan untuk perangkat ini: ${messageContent}`);
//       }
//       else {
//           console.log('Pesan sudah ditampilkan sebelumnya.');
//           if (checkText === "false"){
//           sendTelegramMessage(`Pesan: ${messageContent} diabaikan karena melebihi karakter maksimal (96 karakter).`);
//           }
//       }
//     } else {
//       console.log('Pesan diabaikan karena Unique ID tidak cocok.');
//     }
//   }
// }

// // Fungsi untuk mengekstrak Unique ID dari pesan
// function extractUniqueId(message) {
//   const uniqueIdRegex = /\[(.*?)\]/;
//   const match = message.match(uniqueIdRegex);
//   if (match) {
//     return match[1];
//   }
//   return null; // Mengembalikan null jika tidak ada Unique ID dalam pesan
// }

       // Fungsi untuk mengekstrak Unique ID dari pesan
// let messageContent = match[2];
function extractUniqueId(message) {
//   const uniqueIdRegex = /\[(.*?)\]/;
  const uniqueIdRegex = /^\/([a-zA-Z0-9]+) (.+)$/; // Pola regex untuk format pesan
  const match = message.match(uniqueIdRegex);
  if (match) {
    return match[1]; // Mengambil kode unik dari pesan
    return match[2]; // Mengambil isi pesan
  }
  return null; // Mengembalikan null jika tidak ada Unique ID dalam pesan
}
      
// Fungsi untuk mengolah pesan yang diterima
function processReceivedMessage(receivedMessage) {
    const messageUniqueId = extractUniqueId(receivedMessage);
    localStorage.setItem("messageUniqueIdKu", messageUniqueId);
    if (localStorage.getItem("visit") == null) {
        localStorage.setItem("visit", "true");
      } else {
      // Periksa apakah pesan sudah ditampilkan sebelumnya
      const lastDisplayedMessage = localStorage.getItem('lastDisplayedMessage');
      const messageContent = receivedMessage.replace(`/${messageUniqueId} `, '');
      localStorage.setItem('lastDisplayedMessage', messageContent);
      if (messageUniqueId === deviceUniqueId) {
          // Periksa panjang pesan, maksimal 96 karakter
          if (messageContent.length > 96) {
            sendTelegramMessage(`[To ${messageUniqueId}]: ${messageContent}\n[Status]: failed to send 🤭\n[Reason]:  diabaikan karena melebihi karakter maksimal (96 karakter).`);
          } else if (lastDisplayedMessage !== receivedMessage) {
              sendTelegramMessage(`[To ${messageUniqueId}]: ${messageContent}\n[Status]: sent successfully 🤗`)
            // Tampilkan pesan hanya jika berbeda dengan pesan sebelumnya
            const container = document.querySelector(".message");
            container.innerHTML = `<p>${messageContent}</p>`;
            showToastMessage();
            // Simpan pesan sebagai pesan terakhir yang ditampilkan
            localStorage.setItem('lastDisplayedMessage', receivedMessage);
            console.log(`Pesan untuk perangkat ini: ${messageContent}`);
          } else {
        console.log('Pesan sudah ditampilkan sebelumnya.');
      }
    } else if (receivedMessage.startsWith('/all ')) {
      // Jika pesan dimulai dengan '/all ', kirim pesan ke semua perangkat
      const messageContent = receivedMessage.substring(5); // Menghapus '/all ' dari pesan
      localStorage.setItem("visitur", "false");
    //   lastDisplayedMessage = localStorage.getItem('lastDisplayedMessage');
      console.log(lastDisplayedMessage);
      console.log(receivedMessage);
      if(localStorage.getItem("visitur") == null){
          localStorage.setItem("visitur", "true");
      }else{
          if (lastDisplayedMessage !== messageContent){
              sendTelegramMessageToAllDevices(messageContent);
            //   console.log(`Pesan untuk semua perangkat: ${messageContent}`);
          }
        //   localStorage.setItem("visitur", "true");
      }
    //   else if(localStorage.getItem("visitur") === "true"){
    //       if (lastDisplayedMessage !== receivedMessage){
    //           sendTelegramMessageToAllDevices(messageContent);
    //           console.log(`Pesan untuk semua perangkat: ${messageContent}`);
    //       }
    //   }
    } else {
      sendTelegramMessage(`[Message]: ${messageContent}\n[Status]: failed to send 🤭\n[Reason]: Pesan diabaikan karena tidak sesuai format /kodeunik pesan atau /all pesan.`)
      console.log('Pesan diabaikan karena tidak sesuai format /kodeunik pesan atau /all pesan.');
    }
  }
}

// Fungsi untuk mengirim pesan ke semua perangkat
function sendTelegramMessageToAllDevices(text) {
  // Mengganti ini dengan logika untuk mengirim pesan ke semua perangkat yang diinginkan
  // Anda dapat menggunakan daftar perangkat yang Anda kenali untuk mengirim pesan ke masing-masing
  // Untuk tujuan demonstrasi, kita akan menggunakan daftar perangkat yang diketahui
//   let lastDisplayedMessage = localStorage.getItem('lastDisplayedMessage');
    // Kirim pesan ke setiap perangkat
    const idUnik = localStorage.getItem("messageUniqueIdKu");
    const container2 = document.querySelector(".greetings");
    const container1= document.querySelector("#info-server");
    container1.innerHTML = `<p>Info Server!</p>`;
    container2.innerHTML = `<p>${text}</p>`;
    showToastInfo();
    sendTelegramMessage(`[To]: ${idUnik}\n[Message]: ${text}\n[Status]: sent successfully 😊`);
}



// // Fungsi untuk mengolah pesan yang diterima
// function processReceivedMessage(receivedMessage) {
//   const messageUniqueId = extractUniqueId(receivedMessage);

//   if (localStorage.getItem("visit") == null) {
//     localStorage.setItem("visit", "true");
//   } else {
//     if (messageUniqueId === deviceUniqueId) {
//       const messageContent = receivedMessage.replace(`[${messageUniqueId}] `, '');

//       // Periksa apakah pesan sudah ditampilkan sebelumnya
//       const lastDisplayedMessage = localStorage.getItem('lastDisplayedMessage');
//       if (lastDisplayedMessage !== messageContent) {
//         // Tampilkan pesan hanya jika berbeda dengan pesan sebelumnya
//         const container = document.querySelector(".message");
//         container.innerHTML = `<p>${messageContent}</p>`;
//         showToastMessage();

//         // Simpan pesan sebagai pesan terakhir yang ditampilkan
//         localStorage.setItem('lastDisplayedMessage', messageContent);
//         console.log(`Pesan untuk perangkat ini: ${messageContent}`);
//       } else {
//         console.log('Pesan sudah ditampilkan sebelumnya.');
//       }
//     } else {
//       console.log('Pesan diabaikan karena Unique ID tidak cocok.');
//     }
//   }
// }


// Fungsi untuk polling pesan dari Telegram
function fetchLatestMessage() {
  if (!isPolling) return; // Stop polling if isPolling is false

  const apiUrl = `https://api.telegram.org/bot${botToken}/getUpdates?offset=-1&limit=1`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.result.length > 0) {
        const message = data.result[0].message.text;
        const messageId = data.result[0].message.message_id;

        if (messageId !== lastReceivedMessageId) {
          lastReceivedMessageId = messageId;
          processReceivedMessage(message);
        }

        // Stop polling for a few seconds
        isPolling = false;
        setTimeout(() => {
          isPolling = true;
        }, updateInterval);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Memulai polling pesan secara berkala
setInterval(fetchLatestMessage, updateInterval);


// const botToken = '6412404927:AAEm1RFSUt_euNQetr-ScqtIQ5Doq9ct5HE';
// const chatId = '1173194067';
// const updateInterval = 3000; // Interval dalam milidetik untuk polling (contoh: setiap 5 detik)


// let lastReceivedMessageId = null;
// let isPolling = true;

// var checkText = "false";
// function processCommand(command) {
//   const commandParts = command.split(' ');
//   const action = commandParts[0].toLowerCase();

//   if (action === '/s') {
//     const text = commandParts.slice(1).join(' ');

//     // Periksa panjang teks
//     if (text.length > 96) {
//         checkText = "false";
//     }
//     else{
//         checkText = "true";
//     }
//     return text.split('').join('');
//   }

//   // Tambahkan perintah lain di sini jika diperlukan

//   return null; // Jika tidak ada aksi yang cocok
// }

function sendTelegramMessage(text) {
  // Memeriksa apakah pesan telah dikirim sebelumnya
  

  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const formData = new FormData();
  formData.append('chat_id', chatId);
  formData.append('text', text);

  fetch(apiUrl, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    //   if (data.ok) {
    //     // console.log('Pesan berhasil dikirim ke Telegram:', text);\
    //     if (checkText == "true"){
    //         localStorage.setItem('sentMessage', text); // Menyimpan pesan yang telah dikirim
    //         const container = document.querySelector(".message");
    //         container.innerHTML = `<p>${textOutput}</p>`;
    //         showToastMessage();
    //     }
    //   } else {
    //     console.error('Gagal mengirim pesan ke Telegram:', data.description);
    //   }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}



// var textOutput = '';
// let lastDisplayedMessage = '';
// Your existing fetchLatestMessage function
// function fetchLatestMessage() {
//   if (!isPolling) return; // Stop polling if isPolling is false

//   const apiUrl = `https://api.telegram.org/bot${botToken}/getUpdates?offset=-1&limit=1`;

//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       if (data.result.length > 0) {
//         const message = data.result[0].message.text;
//         const messageId = data.result[0].message.message_id;

//         // Check if the message is the same as the last received message
//         if (messageId !== lastReceivedMessageId) {
//           lastReceivedMessageId = messageId;
          
//           const processedMessage = processCommand(message);
//           textOutput = processedMessage;
//           if (processedMessage !== null) {
//             if (localStorage.getItem("visit") == null) {
//               localStorage.setItem("visit", "true");
//             }
//             else{
//                 if (checkText == "true"){
//                   sendTelegramMessage(`Pesan Anda: ${processedMessage} berhasil terkirim`);
//                 }
//                 else{
//                     sendTelegramMessage(`Pesan Anda: ${processedMessage} gagal terkirim. Melebihi karakter, karakter yang diizinkan 96 karakter. `)
//                 }
//               }
//           }
//         }

//         // Stop polling for a few seconds
//         isPolling = false;
//         setTimeout(() => {
//           isPolling = true;
//         }, updateInterval);
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       });
// }

// setInterval(fetchLatestMessage, updateInterval);