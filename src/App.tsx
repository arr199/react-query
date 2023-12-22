import './App.css'
import { QueryClientProvider , QueryClient,  useQuery } from '@tanstack/react-query'

const URL = "https://randomuser.me/api/?results=10"

function App() {
  const queryClient = new QueryClient()

  return ( 
    <QueryClientProvider client={queryClient}>
        <main>
          <Page></Page>
        </main>
    </QueryClientProvider>
  
  )
}

export default App

export function Page (): JSX.Element {

  const { data , refetch , isLoading  }  = useQuery({ queryKey : ["getUser"], 
    queryFn :  async () => { 
      const res = await fetch(URL)
      const data =  await res.json()
      return data 
  }  ,  enabled : false  , refetchOnWindowFocus : false} )
  
  console.log(data)

  return (
   <div style={{ display : 'grid' , placeItems : "center" , height : "100vh" }} >
      <button onClick={() =>  refetch()} >Fetch</button>
      <div style={{ width : "600px" , height: "600px"  , border : "2px solid gray" }}>
          {data && data?.results?.map((e : any ,index : number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                  <div  key={index} style={{ marginTop : "20px" , display : "flex"  , flexDirection : "column"}}>{e.name.first}</div>
          )  ) }
          {isLoading && <div>Loading now ....</div>  }
      </div>
   </div>
  )
}
