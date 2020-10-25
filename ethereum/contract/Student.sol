pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract Student{
    
    // address public contractOwner;
    // constructor() public{
    //   contractOwner = msg.sender;  
    // }
    // function student() public {
    //     contractOwner = msg.sender;
    // }
    
    // modifier ifOwner(){
    //     require(contractOwner == msg.sender);
    //     _;
    // }
    
    struct studentdetail{
      uint id;
      bytes hash;
    }
    uint[] students;
    studentdetail[] public pupil;
    bytes[] hashes;
    

    function insertdetails(uint id,bytes memory hash) public{
       studentdetail memory Student = studentdetail({
            id: id,
            hash: hash
        });
        
        pupil.push(Student);
    }
    
    function finddetails(uint id) public returns(bytes[] memory) {
        for(uint i = 0; i < pupil.length; i++) {
            if(pupil[i].id == id) {
                hashes.push(pupil[i].hash);
            }
        }
        return(hashes);
    }
    
}