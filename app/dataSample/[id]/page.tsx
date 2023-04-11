"use client";

import React, { useState } from "react";
import {
  Heading,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Center,
  Box,
  IconButton,
  Input,
  Select,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import useSWR from "swr";
import { format } from "date-fns";
import { I_DataSampleItem } from "@/models/dataSampleItem";
import { ChartApp } from "./chart";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";
const DataItem = ({ params }: { params: { id: string } }) => {
  const [dataChart, setDataChart] = useState<number[]>([]);
  const url = `/data-sample/data/${params.id}`;
  const { data, mutate, error, isValidating } = useSWR(url);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  //handle
  function handleShowChart(arrayData: number[]) {
    setDataChart(arrayData);
    onOpen();
  }
  return (
    <Box paddingX={"30px"}>
      <Box
        marginBottom={"20px"}
        display={"flex"}
        alignItems={"center"}
        gap={"16px"}
        paddingTop={"30px"}
      >
        <Button
          onClick={() => {
            router.back();
          }}
          colorScheme="blue"
        >
          <BiArrowBack></BiArrowBack>
        </Button>
        <Heading>Data Sample Item</Heading>
      </Box>
      <TableContainer className="w-2/3">
        <Table size="lg" variant="simple" key={Math.random()}>
          <Thead>
            <Tr>
              <Th className="">ID</Th>
              <Th>Name</Th>
              <Th>angle_id</Th>
              <Th>date</Th>
              <Th>status</Th>
              <Th>Chart</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.map((item: I_DataSampleItem, index: number) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td cursor={"pointer"}>{item.name}</Td>
                <Td textAlign={"center"}>{item.angle_id}</Td>
                <Td>{format(new Date(item.date), "dd MMMM yyyy HH:mm:ss")}</Td>
                <Td>{item.status}</Td>
                <Td>
                  <Button
                    onClick={() => {
                      handleShowChart(item.predict_result);
                    }}
                  >
                    Show Chart
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Predict Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChartApp ChartData={dataChart}></ChartApp>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DataItem;
