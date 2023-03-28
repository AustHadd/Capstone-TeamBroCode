import socket
import threading

HOST = '' #server ip address
PORT = 1234

#will need to add code to determine the parking availability from the camera

def _client():
	client_socket = socket.socket() #initialize the socket
	client_socket.connect((host, port)) #connect the client to the server
	
	data = 1 #will be the availability/occupied parking spot data
	
	client_socket.send(data.encode()) #send the data from the client to the server
	
	#the response from the server. not necessary just for testing
	data = client_socket.recv(1024).decode() 
	
	client_socket.close() #close the client's connection with the server
		
		
