import { Box, Flex, Heading, HStack, IconButton, Input, InputGroup, InputRightElement, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { MagnifyingGlass } from 'phosphor-react' 
import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'


export default function App() {
  const [input, setInput] = useState('')
  const [datas, setDatas] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  const toast = useToast()

  const requestApi = async(zipCode) => {
    const uri = axios.create({
      baseURL: 'https://viacep.com.br/ws/',
      headers: { 'Accept': 'application/json'}
    })

    try {
      const response = await uri.get(`${zipCode}/json/`)
  
      setDatas(response.data)
 
      setIsLoaded(true)
      return
    } catch (error) {
      if(error) {
        
        toast({
          title: "Cep não existe!"
        })
        
        setIsLoaded(false)
        return
      }
    }
  }

  const handleButtonSearch = () => {
    if(!input) return

    return requestApi(input)
  }

  useEffect(() => {
    handleButtonSearch()
  }, [])

  return (
    <HStack bg="yellow.300" justifyContent="center" h="100vh" w="full">
      <VStack 
        height={["60vh","60vh","60vh" ,"60vh"]} 
        width={["96vw","72vw","64vw" ,"28vw"]}
        gap="2rem"
        borderX="4px"
        borderRadius=".8rem"
        borderColor="blue.400"
      >

        <Heading fontSize="md" color="blue.400">Busca CEP</Heading>

        <HStack>
          <InputGroup>
            <Input
              type="text"
              width="20rem"
              fontSize="xs"
              variant="flushed"
              borderColor="gray.500"
              focusBorderColor="gray.600"
              transition="all 0.4s"
              placeholder="Informe o cep..."
              onChange={(e) => setInput(e.target.value)}
            />
              <IconButton
                bg="none"
                _hover="none"
                ml="-2rem"
                cursor="pointer"
                icon={<MagnifyingGlass  color="gray"/>}
                onClick={handleButtonSearch}
              />
          </InputGroup>
        </HStack>
        
        <HStack width="22rem">
          <Skeleton isLoaded={isLoaded}>
            {Object.keys(datas).length > 0 && (
              <Flex gap=".8rem" mx=".8rem" flexWrap="wrap" borderBottom="1px" justifyContent="center">
                <Box>
                  <Text fontWeight="semibold">Cep</Text>
                  <Text>{datas.cep}</Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold">Logradouro</Text>
                  <Text>{datas.logradouro}</Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold">Bairro</Text>
                  <Text>{datas.bairro}</Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold">Localidade</Text>
                  <Text>{datas.localidade}</Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold">UF</Text>
                  <Text>{datas.uf}</Text>
                </Box>
              </Flex>
            )}
          </Skeleton>
        </HStack>

      </VStack>
    </HStack>
  )
}