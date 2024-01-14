import {
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import Pagination from "../table/pagination/Pagination";

const ResultTable = ({
  tableHeadValues = ["Rank", "Username", "Reward Money"],
  tableData = [
    { rank: 1, username: "User 1", rewardMoney: 200 },
    { rank: 2, username: "User 2", rewardMoney: 100 },
    { rank: 3, username: "User 3", rewardMoney: 50 },
    { rank: 4, username: "User 4", rewardMoney: 20 },
    { rank: 5, username: "User 5", rewardMoney: 10 },
    { rank: 6, username: "User 6", rewardMoney: 10 },
    { rank: 7, username: "User 7", rewardMoney: 10 },
    { rank: 8, username: "User 8", rewardMoney: 10 },
    { rank: 9, username: "User 9", rewardMoney: 10 },
    { rank: 10, username: "User 10", rewardMoney: 10 },
  ],
  ...props
}) => {
  return (
    <>
      <TableContainer>
        <Table
          variant="simple"
          colorScheme="teal"
          bgColor={"#FFFAA0"}
          borderRadius={10}
        >
          <Thead>
            <Tr>
              {tableHeadValues.map((data, index) => (
                <Th
                  key={index}
                  width={{ sm: "5%", md: "10%", lg: "20%" }}
                  textAlign={
                    index === 0 ? "left" : index === 1 ? "center" : "right"
                  }
                  fontFamily={"Jockey One"}
                  fontSize={17}
                >
                  {data}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((data) => (
              <Tr key={data.rank}>
                <Td fontFamily={"Jockey One"} fontSize={17}>
                  {data.rank}
                </Td>
                <Td
                  fontFamily={"Jockey One"}
                  fontSize={17}
                  textAlign={"center"}
                >
                  {data.username}
                </Td>
                <Td fontFamily={"Jockey One"} fontSize={17} isNumeric>
                  {data.rewardMoney}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Divider />
      <Pagination />
    </>
  );
};

export default ResultTable;
