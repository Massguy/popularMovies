import MovieList from '@/components/MovieList.vue';
import { mount,shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'


describe('MovieList', () => {
    it('has data', () => {
        expect(typeof MovieList.data).toBe('function')
      })
})
describe('Mounted App', () => {
    const wrapper = mount(MovieList);
  
    test('is a Vue instance', () => {
      expect(wrapper).toBeTruthy()
    })
    test('renders the correct markup', () => {
        expect(wrapper.html()).toContain('Search Movies')
        expect(wrapper.html()).toContain('Popular Movies')
      })
 
  })
  jest.mock("axios", () => ({
    get: () => Promise.resolve({data:{results: [{adult: false,
        backdrop_path: "/fQq1FWp1rC89xDrRMuyFJdFUdMd.jpg",
        genre_ids: [ ],
        id: 761053,
        original_language: "en",
        original_title: "Gabriel's Inferno Part III",
        overview: "The final part of the film adaption of the erotic romance novel Gabriel's Inferno written by an anonymous Canadian author under the pen name Sylvain Reynard.",
        popularity: 34.815,
        poster_path: "/fYtHxTxlhzD4QWfEbrC1rypysSD.jpg",
        release_date: "2020-11-19",
        title: "Gabriel's Inferno Part III",
        video: false,
        vote_average: 9.2,
        vote_count: 491}]}})
  }));
  describe("MovieList API", () => {
    it("mocking the axios call to get movies should work",async () => {
      let wrapper = shallowMount(MovieList);
  
      await flushPromises()
        expect(wrapper.vm.movies.length).toBe(1);
        expect(wrapper.vm.movies).toEqual(
            expect.arrayContaining([      
                expect.objectContaining({  
                    title: "Gabriel's Inferno Part III",
                    poster_path: "/fYtHxTxlhzD4QWfEbrC1rypysSD.jpg",
                    overview: "The final part of the film adaption of the erotic romance novel Gabriel's Inferno written by an anonymous Canadian author under the pen name Sylvain Reynard.",          
                })
              ])
        );
     
    });
  });

  describe('input form check',()=>{
    test('sets the value', async () => {
        const wrapper = mount(MovieList)
        const input = wrapper.find('input')
        expect(input.element.placeholder).toBe('please enter movie name')
      })
  })