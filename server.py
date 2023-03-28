import socket

def _server():
	host = socket.gethostname()
	port = 1234
	
	server_socket = socket.socket()
	server_socket.bind((host, port))
	
	server_socket.listen(2)
	connection, address = server_socket.accept()
	
	#so far would only handle one client. Should be capable of handling multiple clients
	
	while True:
		#receiving data from the client
		data = connection.recv(1024).decode()
		if not data:
			#data is not being received
			break	#end the loop
			
		#not necessary, just to test if the server and client are properly sending/receiving
		data = 'received data' 
		connection.send(data.encode()) #send data to the client
		
	connection.close() #data isn't being received anymore so close the connection
			
