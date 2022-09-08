import React from 'react'
import { Footer, Container, Content, Hero, Heading } from 'react-bulma-components'
import {DiNodejsSmall, DiReact, DiMongodb, DiHtml5, DiCss3, DiJavascript1, DiGithub} from 'react-icons/di'

function AppFooter() {
  return (
    
      <Hero size="fullheight" style={{ width: '100%' }}>
    <Hero.Header>  
    
      
    </Hero.Header>

    <Hero.Body></Hero.Body>
      
        <Footer className='footer' display='flex' justifyContent='space-between' alignContent='center' alignItems='center'>
          <div>
          <Heading marginless paddingless display='flex' alignItems='center' className='logo-text' textColor='#AA1945'>sweetnook</Heading>
          <Content display='flex' alignItems='center'><p>Developed by <a href='https://github.com/kn8a'>Kn8a</a></p></Content>
          </div>
          <Container textAlign={'center'}>
            <p><a href='https://github.com/kn8a/sweetnook-frontend'>Frontend repository</a></p>
            <p><a href='https://github.com/kn8a/sweetnook-api'>Backend API repository</a></p>
          </Container>
          
          <div>
            <Content display='flex' flexDirection='column' textAlign={'center'}>
              <p>Developed with:
              <Content display='flex' justifyContent='space-between' className='develop-icons' alignItems='start'>
                <DiJavascript1 size={'1.3em'} title={'JavaScript'}></DiJavascript1>
                <DiNodejsSmall size={'1.3em'} title={'NodeJS'}></DiNodejsSmall>
                <DiMongodb size={'1.3em'} title={'MongoDB'}></DiMongodb>
                <DiReact size={'1.3em'} title={'React'}></DiReact>
                <DiHtml5 size={'1.3em'} title={'HTML5'}></DiHtml5>
                <DiCss3 size={'1.3em'} title={'CSS3'}></DiCss3>
              </Content>
              </p>
              
            </Content>
          </div>
          
        </Footer>
        
      
        
    </Hero>
    
  )
}

export default AppFooter