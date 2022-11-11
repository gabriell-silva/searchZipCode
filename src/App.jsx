import { Box, Center, Flex, Heading, HStack, IconButton, Input, InputGroup, InputRightElement, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { MagnifyingGlass } from 'phosphor-react' 
import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'


export default function App() {
  const [input, setInput] = useState('')
  const [datas, setDatas] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  const toast = useToast()

  const formatterZipCode = () =>{
    const newZipCode = input.replace(/\D/g, '')

    const isValidZipCode = /^[0-9]{8}$/.test(newZipCode)
    
    return isValidZipCode
  }

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
          title: "Cep informado, inexiste!"
        })
        
        setIsLoaded(false)
        return
      }
    }
  }

  const handleButtonSearch = () => {
    formatterZipCode()

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
        width={["96vw","72vw","64vw" ,"44vw", "28vw"]}
        gap="2rem"
        borderX="4px"
        borderRadius=".8rem"
        borderColor="blue.400"
      >

        <Heading fontSize="md" color="blue.400">Busca CEP</Heading>

        <HStack  width="full" px=".8rem">
          <InputGroup>
            <Input
              type="text"
              px="1rem"
              fontSize="xs"
              variant="flushed"
              borderColor="gray.500"
              focusBorderColor="gray.600"
              transition="all 0.4s"
              placeholder="Informe o cep"
              onChange={(e) => setInput(e.target.value)}
            />
              <IconButton
                bg="none"
                _hover="none"
                colorScheme="none"
                ml="-2rem"
                cursor="pointer"
                icon={<MagnifyingGlass  color="gray"/>}
                onClick={handleButtonSearch}
              />
          </InputGroup>
        </HStack>
        
        <HStack width="full" alignItems="center" justifyContent="center">
          <Skeleton mx=".8rem" isLoaded={isLoaded}>
            {Object.keys(datas).length > 0 && (
              <SimpleGrid 
                columns={[1, 2, 2, 3, 3]} 
                gap=".8rem"
              >
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
                <Box>
                  <Text fontWeight="semibold">IBGE</Text>
                  <Text>{datas.ibge}</Text>
                </Box>
              </SimpleGrid>
            )}
          </Skeleton>
        </HStack>

      </VStack>
    </HStack>
  )
}