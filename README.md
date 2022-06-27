
# **TEXT EDITOR**
> A simple real time collaborative text editor

### Running the application
Install NodeJS, clone the repo and run the following command
Client - cd client && npm install && npm run dev
Server - cd server && npm install && npm start

### Architecture 
The system is designed to have multiple client devices connected to a central server concurrently. The transport mode used is TCP web sockets for faster real time connection. The server stores data in-memory.

#### Diagram
<a href="https://drive.google.com/file/d/1-drW4yRr1QmNil_Srwvz3y8w-gP6R0Y3/view?usp=sharing"><img src="https://drive.google.com/file/d/1-drW4yRr1QmNil_Srwvz3y8w-gP6R0Y3/view?usp=sharing" style="width: 650px; max-width: 100%; height: auto" title="Click to enlarge picture" />


**Conflict resolution** is based on Operational Transformation (OT) technology which allows for simultaneous edits in a non-blocking manner. Every change is represented as an operation. An operation can be applied to the current document on th server which results into a new document state. The changes are then sent to the client to update their local document state. A bit similar to git. One tradeoff with using OT is that it can get very complicated and error-prone. 

A **different technology** I would like to try is Conflict-Free Replicated Data Types (CRDT) where the document data is decentralised, replicated accross clients and may have no need for a server. There is also a possibility of merging CRDT with OT.