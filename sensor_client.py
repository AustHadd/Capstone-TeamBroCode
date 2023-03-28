import socket
import threading

HOST = '' #server ip address
PORT = 1234

def _client():
	client_socket = socket.socket()
	client_socket.connect((host, port))
	
	data = 1 #will be the availability/occupied parking spot data
	
	client_socket.send(data.encode())
	data = client_socket.recv(1024).decode()# the response from the server. not necessary just for testing
	
	client_socket.close()
		
		